import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line no-var
}

function create() {
  return new PrismaClient();
}

export const prisma = globalThis.prisma || create();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
