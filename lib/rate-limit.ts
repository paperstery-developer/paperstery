import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

type RateLimitOptions = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        if (isRateLimited) {
          reject();
        } else {
          resolve();
        }
      }),
  };
}

export const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function checkRateLimit(
  req: NextRequest,
  limit: number = 10,
  tokenKey: string = "global"
) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    await limiter.check(limit, `${tokenKey}_${ip}`);
    return null;
  } catch {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
}
