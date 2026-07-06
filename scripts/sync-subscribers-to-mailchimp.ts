/**
 * One-time script to bulk-upload all existing subscribers to Mailchimp.
 *
 * Run with:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/sync-subscribers-to-mailchimp.ts
 */
import { PrismaClient } from "@prisma/client";
import mailchimp from "@mailchimp/mailchimp_marketing";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    console.error(
      "Missing env vars: MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, MAILCHIMP_SERVER_PREFIX",
    );
    process.exit(1);
  }

  mailchimp.setConfig({ apiKey, server: serverPrefix });

  const subscriptions = await prisma.subscription.findMany();
  const emails = subscriptions.map((s) => s.email);

  console.log(`Found ${emails.length} subscriber(s) in the database.`);

  if (emails.length === 0) {
    console.log("Nothing to sync.");
    return;
  }

  const members = emails.map((email) => ({
    email_address: email,
    email_type: "html" as const,
    status: "subscribed" as const,
  }));

  const raw = await mailchimp.lists.batchListMembers(audienceId, {
    members,
    update_existing: false,
  });

  const response = raw as {
    new_members?: { email_address: string }[];
    updated_members?: { email_address: string }[];
    errors?: { email_address: string; error: string }[];
  };

  console.log(`Sync complete:`);
  console.log(`  Added:            ${response.new_members?.length ?? 0}`);
  console.log(`  Existing (skipped): ${response.updated_members?.length ?? 0}`);
  console.log(`  Errors:           ${response.errors?.length ?? 0}`);

  if (response.errors && response.errors.length > 0) {
    console.log("\nError details:");
    response.errors.forEach((e) => console.log(" -", e.email_address, e.error));
  }
}

main()
  .catch((err) => {
    console.error("Sync failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
