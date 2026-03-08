/**
 * To run this seeder:
 * npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
 */
import { PrismaClient } from "../prisma/generated/prisma/client";
import "dotenv/config";

const bcrypt = require('bcryptjs');

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });


async function main() {
  const superAdminEmail = 'abdrahmanoladimeji02@gmail.com';
  const plainPassword = 'PapersteryAdmin@101';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: superAdminEmail },
  });

  if (existingAdmin) {
    console.log(`[SEED] Super Admin ${superAdminEmail} already exists. Returning.`);
    return;
  }

  console.log(`[SEED] Super Admin not found. Seeding now...`);
  const hashedPassword = await bcrypt.hash(plainPassword, 12);

  const superAdmin = await prisma.admin.create({
    data: {
      email: superAdminEmail,
      password: hashedPassword,
      role: 'superadmin',
    },
  });

  console.log(`[SEED] Success! Super Admin created: ${superAdminEmail}`);
  console.log(`[SEED] IMPORTANT: Temporary Password is: ${plainPassword}`);
  console.log(`[SEED] Please login and use the Reset Password flow if desired.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
