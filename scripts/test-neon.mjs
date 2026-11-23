import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import pg from "pg";

const origin = process.argv[2] ?? "http://localhost:3107";
const email = `neon-smoke-${randomUUID()}@example.com`;
const password = randomUUID();
const cookies = new Map();
const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

async function check(method, path, status, payload) {
  const response = await fetch(new URL(path, origin), {
    method,
    headers: {
      origin,
      cookie: [...cookies].map(([k, v]) => `${k}=${v}`).join("; "),
      ...(payload && { "content-type": "application/json" }),
    },
    body: payload && JSON.stringify(payload),
  });
  for (const header of response.headers.getSetCookie()) {
    const pair = header.split(";")[0];
    const i = pair.indexOf("=");
    cookies.set(pair.slice(0, i), pair.slice(i + 1));
  }
  assert.equal(response.status, status, `${method} ${path} returned ${response.status}`);
  console.log(method, path, response.status);
  return response;
}

const resource = "/api/account/export";
try {
  await check("GET", resource, 401);
  await check("POST", "/api/auth/sign-up/email", 200, { name: "Neon smoke test", email, password });
  await check("POST", "/api/auth/sign-in/email", 200, { email, password });
  const session = await (await check("GET", "/api/auth/get-session", 200)).json();
  assert.equal(session.user.email, email);
  await check("POST", resource, 204);
  try {
    const exported = await (await check("GET", resource, 200)).json();
    assert.equal(exported.id, session.user.id);
    assert.equal(exported.email, email);
    console.log("Downloaded private object matches the signed-in PostgreSQL account");
  } finally {
    await check("DELETE", resource, 204);
  }
  await check("GET", resource, 404);
  await check("POST", "/api/auth/sign-out", 200, {});
  await check("GET", resource, 401);
} finally {
  try {
    await db.query('DELETE FROM neon_auth."user" WHERE email = $1', [email]);
  } finally {
    await db.end();
  }
}
