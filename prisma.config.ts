import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(process.cwd());
const direct = process.env.DATABASE_URL_UNPOOLED;
const url = direct ? new URL(direct) : undefined;
url?.searchParams.set("schema", "directory");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  datasource: { url: url?.toString() },
});
