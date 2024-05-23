import { PrismaClient } from "@prisma/client";

declare global {
   // eslint-disable-next-line no-unused-vars
   var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
   prisma = new PrismaClient();
} else {
   if (!global.cachedPrisma) {
      global.cachedPrisma = new PrismaClient();
   }
   prisma = global.cachedPrisma;
}

export const db = prisma;

// Don't forget to close the Prisma client when you're done
async function cleanup() {
   await db.$disconnect();
}
