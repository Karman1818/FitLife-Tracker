import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var prisma: ReturnType<typeof create> | undefined; // eslint-disable-line no-var
}

function create() {
  return new PrismaClient().$extends(withAccelerate());
}

export const prisma = globalThis.prisma || create();

if(process.env.NODE_ENV !== "production")
  globalThis.prisma = prisma;