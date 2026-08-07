"use server";

import { cookies } from "next/headers";

const API_BASE = "http://localhost:3000"; // Rewrites to Nginx on port 80

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface SignInPayload {
  email: string;
  password: string;
}

export async function signin(payload: SignInPayload): Promise<AuthResponse> {
 
  const res = await fetch(`${API_BASE}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // needed if backend sets an httpOnly cookie
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Signin failed' }));
    throw new Error(error.message || `Signin failed with status ${res.status}`);
  }

  // Read cookies from Go response
  const setCookieHeaders = res.headers.getSetCookie(); // Node.js 18+
  const cookieStore = await cookies();

  for (const cookieStr of setCookieHeaders) {
    if (cookieStr.includes("access_token")) {
      const val = cookieStr.split(";")[0].split("=")[1];
      cookieStore.set("access_token", val, { httpOnly: true, path: "/", secure: false });
    }
    if (cookieStr.includes("refresh_token")) {
      const val = cookieStr.split(";")[0].split("=")[1];
      cookieStore.set("refresh_token", val, { httpOnly: true, path: "/", secure: false });
    }
  }

  return res.json();
}