import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalDb = globalThis as typeof globalThis & { directoryDb?: PrismaClient };

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");
  return globalDb.directoryDb ??= new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
}
