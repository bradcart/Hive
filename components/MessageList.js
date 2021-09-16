import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import formatRelative from "date-fns/formatRelative";
import { db } from "../firebase/clientApp";
import { useRoom } from "../context/roomContext";
import { useUser } from "../context/userContext";
import { MessageInput } from "./MessageInput";

export const MessageList = () => {
  const [messages, setMessages] = useState([]);

  /* contexts */
  const { currentRoom } = useRoom();
  const { currentUser } = useUser();
  const { uid, displayName, photoURL } = currentUser;

  /* firebase refs & queries */
  const messagesRef = db
    .collection("rooms")
    .doc(currentRoom)
    .collection("messages");
  const messagesQuery = messagesRef.orderBy("createdAt").limit(50);

  /* populate messages array */
  useEffect(() => {
    const unsubscribe = messagesQuery.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });
    return () => unsubscribe();
  }, [currentRoom]);

  /* determine if a message is from currentUser */
  function sentByUser(userId) {
    if (userId === uid) {
      return true;
    } else {
      return false;
    }
  }

  /* load higher resolution avatar */
  function replacePhotoUrl(url) {
    const updatedUrl = url.replace("s96-c", "s192-c");
    return updatedUrl;
  }

  /* framer motion stuff */
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const messageVariants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { duration: 1.5, ...transition },
    },
  };

  return (
    <div className="messages-container">
      <ul className="messages-list">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className={
              sentByUser(message.uid)
                ? "messages-list--right"
                : "messages-list--left"
            }
          >
            <div>
              <motion.div
                className={
                  sentByUser(message.uid) ? "message-sent" : "message-received"
                }
                variants={messageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* show displayName if message is from different user than previous OR if it's the first message in room  */}
                  {(message.displayName &&
                    messages[index - 1] &&
                    messages[index - 1].displayName !== message.displayName) ||
                  index === 0 ? (
                    <span className="name">{message.displayName}</span>
                  ) : null}
                  <div
                    className={
                      sentByUser(message.uid)
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
                      src={replacePhotoUrl(message.photoURL)}
                      alt={`${message.displayName}'s avatar`}
                      width={120}
                      height={120}
                      quality={100}
                    />
                  ) : null}
                </div>
              </motion.div>
            </div>
          </li>
        ))}
      </ul>

      {messages.length > 0 ? (
        <MessageInput
          currentRoom={currentRoom}
          uid={uid}
          displayName={displayName}
          photoURL={photoURL}
        />
      ) : null}
    </div>
  );
};
