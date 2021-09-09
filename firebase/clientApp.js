import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();

const authStateHandler = (callback) => {
  return auth.onAuthStateChanged(callback);
};

/* hook to set user online and listen for disconnect */
const useOnlinePresence = () => {
  // user, database and firestore refs
  const userId = auth.currentUser.uid;
  const name = auth.currentUser.displayName;
  const photoUrl = auth.currentUser.photoURL;
  const databaseRef = firebase.database().ref(`/status/${userId}`);
  const firestoreRef = firebase.firestore().doc(`/status/${userId}`);

  // values sent to database & firestore
  const databaseOffline = {
    state: "offline",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  const databaseOnline = {
    state: "online",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  const firestoreOffline = {
    state: "offline",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const firestoreOnline = {
    state: "online",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  // add disconnect listener to database, then set user online in database & firestore
  const setOnlineStatus = () => {
    databaseRef
      .onDisconnect()
      .set(databaseOffline)
      .then(() => {
        databaseRef.set(databaseOnline);
        firestoreRef.set(firestoreOnline);
      });
  };

  useEffect(() => {
    const unsubscriber = firebase
      .database()
      .ref(".info/connected")
      .on("value", (snapshot) => {
        if (snapshot && snapshot.val() == false) {
          firestoreRef.set(firestoreOffline);
          return;
        }

        setOnlineStatus();
      });

    return unsubscriber;
  }, []);
};

export { firebase, auth, db, authStateHandler, useOnlinePresence };
