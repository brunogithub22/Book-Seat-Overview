"use client";

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
  remember: boolean;
}

export async function signin(payload: SignInPayload): Promise<AuthResponse> {
 
  const res = await fetch("/api/auth/refresh/signin", {
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


  return res.json();
}