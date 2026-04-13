/*
  Run with:
  mongosh "$DATABASE_URL" "prisma/admins-migration.mongodb.js"

  This script:
  1. Backfills missing admin roles to "admin"
  2. Ensures timestamps exist on older admin records
  3. Rebuilds the unique email index used by admin creation
*/

const admins = db.getCollection("admins");
const now = new Date();

admins.updateMany(
  {
    $or: [
      { role: { $exists: false } },
      { role: null },
      { role: "" },
    ],
  },
  {
    $set: {
      role: "admin",
      updatedAt: now,
    },
  }
);

admins.updateMany(
  { createdAt: { $exists: false } },
  {
    $set: {
      createdAt: now,
      updatedAt: now,
    },
  }
);

try {
  admins.dropIndex("email_1");
} catch (error) {
  if (error.codeName !== "IndexNotFound") {
    throw error;
  }
}

admins.createIndex({ email: 1 }, { unique: true, name: "email_1" });

print("Admin migration complete.");
