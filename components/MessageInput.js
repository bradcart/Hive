import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { firebase, db } from "../firebase/clientApp";
import { useTyping } from "../context/typingContext";

export const MessageInput = ({ currentRoom, uid, displayName, photoURL }) => {
  const [newMessage, setNewMessage] = useState("");
  const { isTyping, setIsTyping } = useTyping();
  const dummySpace = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const messagesRef = db
      .collection("rooms")
      .doc(currentRoom)
      .collection("messages");
    messagesRef.add({
      text: newMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });
    setNewMessage("");
    setIsTyping(false);
    dummySpace.current.scrollIntoView({ behavior: "smooth" });
  }

  function onTypingStart(value) {
    setNewMessage(value);
    setIsTyping(true);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [isTyping]);

  return (
    <>
      <div ref={dummySpace}></div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={newMessage}
          onInput={(e) => onTypingStart(e.target.value)}
          placeholder="Type your message here..."
        />

        <button type="submit" disabled={!newMessage}>
          <Image src="/hive-send.svg" alt="Send" width={31.2} height={26.7} />
        </button>
      </form>
    </>
  );
};
