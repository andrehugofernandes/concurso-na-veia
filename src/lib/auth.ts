import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { cookies } from 'next/headers';

// Lazy initialize Firebase Admin SDK
let auth: ReturnType<typeof getAuth> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

function initializeFirebase() {
  if (auth && storage) {
    return { auth, storage };
  }

  const firebaseApps = getApps();
  if (firebaseApps.length === 0) {
    const serviceAccount = process.env.FIREBASE_ADMIN_SDK_KEY
      ? JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY)
      : undefined;

    if (serviceAccount) {
      initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    }
  }

  auth = getAuth();
  storage = getStorage();
  return { auth, storage };
}

export function getAuthInstance() {
  const { auth: authInstance } = initializeFirebase();
  return authInstance;
}

export function getStorageInstance() {
  const { storage: storageInstance } = initializeFirebase();
  return storageInstance;
}

/**
 * Verifica se o usuário está autenticado via Firebase
 */
export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return null;
    }

    const authInstance = getAuthInstance();
    const decodedClaims = await authInstance.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auth verification failed:', error);
    return null;
  }
}

/**
 * Cria um token de sessão para o usuário
 */
export async function createSessionCookie(idToken: string, expiresIn: number = 60 * 60 * 24 * 5) {
  try {
    const authInstance = getAuthInstance();
    const sessionCookie = await authInstance.createSessionCookie(idToken, { expiresIn });
    return sessionCookie;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Session cookie creation failed:', error);
    throw error;
  }
}

/**
 * Revoga a sessão do usuário
 */
export async function revokeSession(uid: string) {
  try {
    const authInstance = getAuthInstance();
    await authInstance.revokeRefreshTokens(uid);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Session revocation failed:', error);
    throw error;
  }
}

/**
 * Envia email de reset de senha
 */
export async function sendPasswordResetEmail(email: string) {
  try {
    const authInstance = getAuthInstance();
    const resetLink = await authInstance.generatePasswordResetLink(email);
    return resetLink;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Password reset email failed:', error);
    throw error;
  }
}

/**
 * Habilita 2FA para usuário
 */
export async function enableTwoFactor(uid: string) {
  try {
    const authInstance = getAuthInstance();
    await authInstance.setCustomUserClaims(uid, { twoFactorEnabled: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('2FA enablement failed:', error);
    throw error;
  }
}

/**
 * Desabilita 2FA para usuário
 */
export async function disableTwoFactor(uid: string) {
  try {
    const authInstance = getAuthInstance();
    await authInstance.setCustomUserClaims(uid, { twoFactorEnabled: false });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('2FA disablement failed:', error);
    throw error;
  }
}
