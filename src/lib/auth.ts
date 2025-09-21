import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'healthcompass_session';
// In a real app, use a proper JWT library like 'jose' to sign and verify tokens.
// For this demo, we'll use a simple, insecure value.
const ADMIN_SESSION_VALUE = 'admin_logged_in';
const ADMIN_USER = { id: 'admin', name: 'Admin' };

export async function setSession() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionValue === ADMIN_SESSION_VALUE) {
    return ADMIN_USER;
  }
  return null;
}

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
