import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { firebase, db } from "../firebase/clientApp";
import { useRoom } from "../context/roomContext";
import { useUser } from "../context/userContext";

export const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { currentRoom } = useRoom();
  const { currentUser } = useUser();
  const { uid, displayName, photoURL } = currentUser;

  useEffect(() => {
    const messagesRef = db
      .collection("rooms")
      .doc(currentRoom)
      .collection("messages");
    const messagesQuery = messagesRef.orderBy("createdAt").limit(50);
    const unsubscribe = messagesQuery.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessages(data);
    });

    return () => unsubscribe();
  }, [currentRoom]);

  const dummySpace = useRef();
  const handleSubmit = (e) => {
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
    dummySpace.current.scrollIntoView({ behavor: "smooth" });
  };

  function sentOrReceived(userId) {
    if (userId === uid) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="messages-container">
      <ul className="messages-list">
        {messages.map((message) => (
          <li
            key={message.id}
            className={
              sentOrReceived(message.uid)
                ? "messages-list--right"
                : "messages-list--left"
            }
          >
            <div>
              <div
                className={
                  sentOrReceived(message.uid)
                    ? "message-sent"
                    : "message-received"
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {message.displayName ? (
                    <span className="name">{message.displayName}</span>
                  ) : null}
                  <div
                    className={
                      sentOrReceived(message.uid)
                        ? "message-sent--text"
                        : "message-received--text"
                    }
                  >
                    <span>{message.text}</span>
                  </div>
                </div>
                <div className="avatar-wrapper">
                  {message.photoURL ? (
                    <Image
                      className="avatar"
                      src={message.photoURL}
                      alt={`${message.displayName}'s avatar`}
                      width={48}
                      height={48}
                      quality={100}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <section ref={dummySpace}></section>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />

        <button type="submit" disabled={!newMessage}>
          <Image src="/hive-send.svg" alt="Send" width={31.2} height={26.7} />
        </button>
      </form>
    </div>
  );
};
