import { PrismaClient } from "../prisma/generated/prisma/client";
import "dotenv/config";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
    accelerateUrl: process.env.DATABASE_URL as string,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

