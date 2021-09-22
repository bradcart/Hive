import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFirestoreCollectionData } from "reactfire";
import {
  collection,
  doc,
  addDoc,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { useTyping } from "../context/typingContext";

/*  typingContext is imported because this component needs to update Firebase directly.
roomContext/userContext are already being used in parent component so they're passed as props instead. */

export const MessageInput = ({
  firestore,
  currentRoom,
  uid,
  displayName,
  photoURL,
}) => {
  const { isTyping, setIsTyping } = useTyping();

  const [newMessage, setNewMessage] = useState("");
  const dummySpace = useRef();

  const roomsRef = collection(firestore, "rooms");
  const roomDoc = doc(roomsRef, currentRoom);
  const messagesRef = collection(roomDoc, "messages");

  function handleSubmit(e) {
    e.preventDefault();
    addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });
    setNewMessage("");
    setIsTyping(false);
    dummySpace.current.scrollIntoView({ behavior: "smooth" });
  }

  /* return different phrases based on # of users typing */
  function renderTypingIndicator(array) {
    const lastUser = array.slice(array.length - 1, array.length)[0].displayName;
    if (array.length > 1) {
      return (
        <div className="message-input__typing">
          <span>{lastUser} + 1 other</span> is typing...
        </div>
      );
    } else if (array.length > 2) {
      return (
        <div className="message-input__typing">
          <span>
            {lastUser} + {array.length - 1} others
          </span>
          &nbsp;are typing...
        </div>
      );
    } else {
      return (
        <div className="message-input__typing">
          <span>{lastUser}</span>&nbsp;is typing...
        </div>
      );
    }
  }

  /* render typing indicator */
  function onTypingStart(value) {
    setNewMessage(value);
    setIsTyping(true);
  }

  /* debounced setIsTyping to false */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [isTyping]);

  /* populate usersTyping array */
  const usersTypingRef = collection(firestore, "status");
  const usersTypingQuery = query(
    usersTypingRef,
    where("state", "==", "online"),
    where("inRoom", "==", currentRoom),
    where("isTyping", "==", true)
  );
  const { data: usersTyping } = useFirestoreCollectionData(usersTypingQuery, {
    idField: "id",
  });

  return (
    <>
      <div ref={dummySpace}></div>
      <div className="message-input">
        {usersTyping && usersTyping.length > 0
          ? renderTypingIndicator(usersTyping)
          : null}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={newMessage}
            onInput={(e) => onTypingStart(e.target.value)}
            // onBlur={() => setIsTyping(false)}
            placeholder="Type your message here..."
          />

          <button type="submit" disabled={!newMessage}>
            <Image src="/hive-send.svg" alt="Send" width={31.2} height={26.7} />
          </button>
        </form>
      </div>
    </>
  );
};
