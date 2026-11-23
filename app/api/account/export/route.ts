import { DeleteObjectCommand, GetObjectCommand, NoSuchKey, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const db = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
const storage = new S3Client({ forcePathStyle: true });

async function accountExport(request: Request) {
  if (request.method !== "GET" && request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }
  const { data: session } = await auth.getSession();
  if (!session?.user) return new Response(null, { status: 401 });

  const object = { Bucket: "assets", Key: `account-exports/${session.user.id}.json` };
  if (request.method === "POST") {
    const result = await db.query(
      'SELECT id, name, email, "createdAt" FROM neon_auth."user" WHERE id = $1',
      [session.user.id],
    );
    if (!result.rowCount) return new Response(null, { status: 404 });
    await storage.send(new PutObjectCommand({
      ...object,
      Body: JSON.stringify(result.rows[0]),
      ContentType: "application/json",
    }));
    return new Response(null, { status: 204 });
  }
  if (request.method === "DELETE") {
    await storage.send(new DeleteObjectCommand(object));
    return new Response(null, { status: 204 });
  }
  try {
    const { Body } = await storage.send(new GetObjectCommand(object));
    return new Response(Body!.transformToWebStream(), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="konto.json"',
      },
    });
  } catch (error) {
    if (error instanceof NoSuchKey) return new Response(null, { status: 404 });
    throw error;
  }
}

export { accountExport as GET, accountExport as POST, accountExport as DELETE };
