import { useEffect } from "react";
import {
  useUser,
  useFirestore,
  // useFirestoreDoc,
  // useFirestoreDocData,
  // useFirestoreCollectionData,
  useDatabase,
  // useDatabaseObject,
  useDatabaseObjectData,
  // useDatabaseListData,
} from "reactfire";
import {
  ref,
  set,
  update,
  onDisconnect,
  serverTimestamp,
} from "@firebase/database";
import {
  doc,
  setDoc,
  // addDoc,
  // getDoc,
  updateDoc,
  serverTimestamp as firestoreTimestamp,
} from "@firebase/firestore";
import { useRoom } from "../context/roomContext";
import { useTyping } from "../context/typingContext";

export const useOnlinePresence = () => {
  const { data: currentUser } = useUser();

  const { currentRoom } = useRoom();
  const { isTyping } = useTyping();

  const database = useDatabase();
  const databaseRef = ref(database, "/status/" + currentUser.uid);
  // const { data: databaseStatus } = useDatabaseObjectData(databaseRef, {
  //   idField: "id",
  // });

  const firestore = useFirestore();
  const firestoreRef = doc(firestore, "status", currentUser.uid);
  // const { data: firestoreStatus } = useFirestoreDocData(firestoreRef, {
  //   idField: "id",
  // });

  const databaseOffline = {
    state: "offline",
    displayName: currentUser.displayName,
    inRoom: currentRoom,
    isTyping: false,
    last_changed: serverTimestamp(),
  };
  const databaseOnline = {
    state: "online",
    displayName: currentUser.displayName,
    inRoom: currentRoom,
    isTyping: isTyping,
    last_changed: serverTimestamp(),
  };
  const firestoreOffline = {
    state: "offline",
    displayName: currentUser.displayName,
    inRoom: currentRoom,
    isTyping: false,
    last_changed: firestoreTimestamp(),
  };
  const firestoreOnline = {
    state: "online",
    displayName: currentUser.displayName,
    inRoom: currentRoom,
    isTyping: isTyping,
    last_changed: firestoreTimestamp(),
  };

  const setOnlineStatus = () => {
    onDisconnect(databaseRef)
      .set(databaseOffline)
      .then(() => {
        set(databaseRef, databaseOnline);
        setDoc(firestoreRef, firestoreOnline);
      });
  };

  const databaseConnectionRef = ref(database, ".info/connected");
  const { data: connectionStatus } = useDatabaseObjectData(
    databaseConnectionRef
  );

  useEffect(() => {
    if (connectionStatus == false) {
      setDoc(firestoreRef, firestoreOffline);
      return;
    }
    setOnlineStatus();
  }, [connectionStatus]);

  useEffect(() => {
    update(databaseRef, { inRoom: currentRoom });
    updateDoc(firestoreRef, { inRoom: currentRoom });
  }, [currentRoom]);

  useEffect(() => {
    update(databaseRef, { isTyping: isTyping });
    updateDoc(firestoreRef, { isTyping: isTyping });
  }, [isTyping]);

  //   useEffect(() => {
  //     update(databaseRef, { isTyping: isTyping });
  //     updateDoc(firestoreRef, { isTyping: isTyping });
  //   }, [isTyping]);

  // useEffect(() => {
  //   console.log(currentRoom);
  //   console.log("database: " + JSON.stringify(databaseStatus));
  //   console.log("firestore: " + JSON.stringify(firestoreStatus));
  //   // update(databaseRef, { currentRoom: currentRoom });
  //   // updateDoc(firestoreRef, { currentRoom: currentRoom });
  // }, [currentRoom]);
};
