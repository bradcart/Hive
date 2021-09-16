import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { firebase, db } from "../firebase/clientApp";
import { useTyping } from "../context/typingContext";

/*  typingContext is imported because this component needs to update Firebase directly.
roomContext/userContext are already being used in parent component so they're passed as props instead. */

export const MessageInput = ({ currentRoom, uid, displayName, photoURL }) => {
  const [newMessage, setNewMessage] = useState("");
  const [usersTyping, setUsersTyping] = useState([]);
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

  /* return different phrases based on # of users typing */
  function renderTypingIndicator(array) {
    const lastUser = array.slice(array.length - 1, array.length)[0].displayName;
    if (array.length > 1) {
      return (
        <div className="typing-indicator">
          <span>{lastUser} + 1 other</span>&nbsp;is typing...
        </div>
      );
    } else if (array.length > 2) {
      return (
        <div className="typing-indicator">
          <span>
            {lastUser} + {array.length - 1} others
          </span>
          &nbsp;are typing...
        </div>
      );
    } else {
      return (
        <div className="typing-indicator">
          <span>{lastUser}</span>&nbsp;is typing...
        </div>
      );
    }
  }

  /* TODO: clean up isTyping to only be true when newMessage !== "" */

  /* onInput method */
  function onTypingStart(value) {
    setNewMessage(value);
    setIsTyping(true);
  }

  /* debounce set isTyping to false */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [isTyping]);

  /* populate usersTyping array */
  const usersTypingRef = db.collection("status");
  const usersTypingQuery = usersTypingRef
    .where("state", "==", "online")
    .where("inRoom", "==", currentRoom)
    .where("isTyping", "==", true);
  useEffect(() => {
    const unsubscribe = usersTypingQuery.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsersTyping(data);
    });
    return () => unsubscribe();
  }, [currentRoom]);

  return (
    <div className="form-wrapper">
      <div ref={dummySpace}></div>
      {usersTyping.length > 0 ? renderTypingIndicator(usersTyping) : null}
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
  );
};
