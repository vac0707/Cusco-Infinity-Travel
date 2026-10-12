import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Read config from Vite environment variables
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || '(default)';

export const isFirebaseConfigured = Boolean(
  apiKey && 
  apiKey.trim() !== '' && 
  projectId && 
  projectId.trim() !== ''
);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    };

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    authInstance = getAuth(app);
    // Support custom or default database ID
    dbInstance = databaseId && databaseId !== '(default)' 
      ? getFirestore(app, databaseId) 
      : getFirestore(app);
    storageInstance = getStorage(app);
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testFirestoreConnection(): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      message: 'Variables de entorno de Firebase no configuradas en .env'
    };
  }

  try {
    await getDocFromServer(doc(db, '_health', 'check'));
    return {
      success: true,
      message: 'Conexión a Cloud Firestore establecida con éxito.'
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('offline') || msg.includes('unavailable')) {
      return {
        success: false,
        message: 'No se pudo conectar a Firestore. Revisa las reglas o conexión.'
      };
    }
    // A permission-denied is actually proof that the database is reachable and active!
    if (msg.includes('permission-denied') || msg.includes('PERMISSION_DENIED')) {
      return {
        success: true,
        message: 'Servidor Firestore accesible (reglas de seguridad activas).'
      };
    }
    return {
      success: false,
      message: `Error al probar Firestore: ${msg}`
    };
  }
}
