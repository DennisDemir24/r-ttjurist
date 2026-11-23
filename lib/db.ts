import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalDb = globalThis as typeof globalThis & {
  directoryDb?: PrismaClient;
  directoryClientClass?: typeof PrismaClient;
};

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");
  // Hot reload can preserve the old pool after Prisma regenerates its client.
  if (!globalDb.directoryDb || globalDb.directoryClientClass !== PrismaClient) {
    const previous = globalDb.directoryDb;
    globalDb.directoryDb = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    });
    globalDb.directoryClientClass = PrismaClient;
    if (previous) void previous.$disconnect().catch(() => console.warn("Could not close the previous Prisma client."));
  }
  return globalDb.directoryDb;
}
