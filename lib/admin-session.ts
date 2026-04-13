import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AdminSession {
  id: string;
  email: string;
  role: string;
}

function isValidAdminSession(payload: unknown): payload is AdminSession {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const session = payload as Record<string, unknown>;

  return (
    typeof session.id === "string" &&
    typeof session.email === "string" &&
    typeof session.role === "string"
  );
}

export function verifyAdminSessionToken(token: string): AdminSession | null {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in environment variables");
    return null;
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    return isValidAdminSession(payload) ? payload : null;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
}
