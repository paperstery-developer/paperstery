import mailchimp from "@mailchimp/mailchimp_marketing";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

function getClient() {
  if (!API_KEY || !SERVER_PREFIX) {
    throw new Error("Mailchimp env vars not configured");
  }
  mailchimp.setConfig({ apiKey: API_KEY, server: SERVER_PREFIX });
  return mailchimp;
}

export async function addSubscriberToMailchimp(email: string): Promise<void> {
  if (!AUDIENCE_ID) return;
  try {
    const client = getClient();
    await client.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
  } catch (err: unknown) {
    // Silently ignore "already subscribed" errors
    const status = (err as { status?: number }).status;
    if (status === 400) return;
    console.error("Mailchimp add subscriber error:", err);
  }
}

export async function bulkAddSubscribersToMailchimp(
  emails: string[],
): Promise<{ added: number; errors: number }> {
  if (!AUDIENCE_ID) throw new Error("MAILCHIMP_AUDIENCE_ID not set");
  const client = getClient();

  const members = emails.map((email) => ({
    email_address: email,
    email_type: "html" as const,
    status: "subscribed" as const,
  }));

  const response = await client.lists.batchListMembers(AUDIENCE_ID, {
    members,
    update_existing: false,
  });

  const result = response as {
    new_members?: unknown[];
    errors?: unknown[];
  };

  return {
    added: result.new_members?.length ?? 0,
    errors: result.errors?.length ?? 0,
  };
}
