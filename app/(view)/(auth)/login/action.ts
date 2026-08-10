"use client";


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