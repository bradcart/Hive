// import { getFirestore } from "firebase";
import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { getFirestore } from "@firebase/firestore";
import {
  FirebaseAppProvider,
  useFirebaseApp,
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
} from "reactfire";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function FirebaseComponents({ children }) {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const database = getDatabase(app);
  const firestore = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseComponents>{children}</FirebaseComponents>
    </FirebaseAppProvider>
  );
};
