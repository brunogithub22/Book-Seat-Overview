"use client";

export interface AuthResponse {
  surname: string;
  email: string;
  name: string;
}


export interface SignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  remember: boolean;
}

export async function signup(payload: SignUpPayload): Promise<AuthResponse> {
 
  const res = await fetch("/api/auth/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // needed if backend sets an httpOnly cookie
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Signup failed' }));
    throw new Error(error.message || `Signup failed with status ${res.status}`);
  }

  

  return res.json();
}