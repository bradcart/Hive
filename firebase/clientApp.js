import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
// import { getFirestore } from "firebase/firestore";
import "firebase/compat/database";
import { useEffect } from "react";
import { useRoom } from "../context/roomContext";
import { useTyping } from "../context/typingContext";

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

/* hook to set user online and listen for disconnect */
const useOnlinePresence = () => {
  const userId = auth.currentUser.uid;
  const name = auth.currentUser.displayName;
  const photoUrl = auth.currentUser.photoURL;

  const dbStatusRef = firebase.database().ref(`/status/${userId}`);
  const fsStatusRef = firebase.firestore().doc(`/status/${userId}`);

  const { currentRoom } = useRoom();
  const { isTyping } = useTyping();

  // values sent to database & firestore
  const databaseOffline = {
    state: "offline",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.database.ServerValue.TIMESTAMP,
    inRoom: currentRoom,
    isTyping: null,
  };
  const databaseOnline = {
    state: "online",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.database.ServerValue.TIMESTAMP,
    inRoom: currentRoom,
    isTyping: isTyping,
  };
  const firestoreOffline = {
    state: "offline",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    inRoom: currentRoom,
    isTyping: null,
  };
  const firestoreOnline = {
    state: "online",
    displayName: name,
    photoURL: photoUrl,
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    inRoom: currentRoom,
    isTyping: isTyping,
  };
  const userActivity = {
    isTyping: isTyping,
    inRoom: currentRoom,
  };

  /* add disconnect listener to database, then set user online in database & firestore */
  const setOnlineStatus = () => {
    dbStatusRef
      .onDisconnect()
      .set(databaseOffline)
      .then(() => {
        dbStatusRef.set(databaseOnline);
        fsStatusRef.set(firestoreOnline);
      });
  };

  useEffect(() => {
    const dbConnectionRef = firebase.database().ref(".info/connected");
    const unsubscribe = dbConnectionRef.on("value", (snapshot) => {
      if (snapshot && snapshot.val() == false) {
        fsStatusRef.set(firestoreOffline);
        return;
      }
      setOnlineStatus();
    });

    return () => unsubscribe();
  }, []);

  /* update isTyping and currentRoom values on change */
  useEffect(() => {
    dbStatusRef.update(userActivity);
    fsStatusRef.update(userActivity);
  }, [isTyping, currentRoom]);
};

export { firebase, auth, db, useOnlinePresence };
