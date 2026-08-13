"use client";

import {getCookie} from "@/utils/cookie"

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthCSRFResponse {
  token: boolean;
}


export interface SignInPayload {
  email: string;
  password: string;
  remember: boolean;
}

export async function checkAccountType(payload: SignInPayload): Promise<{ isGoogle: boolean }> {
  const response = await fetch("/api/auth/account-type", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Lookup failed' }));
    throw new Error(error.message || `Lookup failed with status ${response.status}`);
  }

  return response.json();
}

export function redirectToGoogleSignIn(): void {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/signin`;
  // no return value — this function's job is done once the browser starts navigating
}

export async function signin(payload: SignInPayload): Promise<AuthResponse> {

 
  const csrfToken = getCookie('csrf_token');
  
  if (csrfToken === null) {
    throw new Error('Missing CSRF token — user may not be authenticated'); 
  }

  const res = await fetch("/api/auth/refresh/signin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
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

export async function CSRF_signin(): Promise<AuthCSRFResponse> {
 
  const res = await fetch("/api/auth/CSRF", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // needed if backend sets an httpOnly cookie
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'CSRF failed' }));
    throw new Error(error.message || `Signin failed with status ${res.status}`);
  }


  return res.json();
}