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
  // const usersTypingRef = db.collection("status");

  const messagesQuery = messagesRef.orderBy("createdAt").limit(50);
  // const usersTypingQuery = usersTypingRef
  // .where("state", "==", "online")
  // .where("inRoom", "==", currentRoom)
  // .where("isTyping", "==", true);
  // .orderBy("last_changed");

  /* method to add query snapshot listeners */
  const addMessageAndTypingListeners = () => {
    // usersTypingQuery.onSnapshot((snap) => {
    //   const data = snap.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setUsersTyping(data);
    // });

    messagesQuery.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });
  };

  /* query results change depending on currentRoom */
  useEffect(() => {
    addMessageAndTypingListeners();

    return () => addMessageAndTypingListeners();
  }, [currentRoom]);

  /* determine if a message is from currentUser */
  function sentByUser(userId) {
    if (userId === uid) {
      return true;
    } else {
      return false;
    }
  }

  /* load higher resolution profile pic */
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
                  {/* show displayName if message is from different user than previous OR if it's the first message being mapped  */}
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

/* TODO: cleanup this method that only shows timestamp every 10+ mins */
/* {message.createdAt.seconds && i === 0 ? (
              <div className="timestamp">
                {formatRelative(
                  new Date(message.createdAt.seconds * 1000),
                  new Date()
                )}
              </div>
            ) : message.createdAt.seconds &&
              i > 0 &&
              message.createdAt.seconds >
                messages[i - 1].createdAt.seconds + 600 ? (
              <div className="timestamp">
                <hr
                  style={{
                    margin: "0px auto 15px auto",
                    opacity: 0.2,
                    width: "90%",
                  }}
                />
                {formatRelative(
                  new Date(message.createdAt.seconds * 1000),
                  new Date()
                )}
              </div>
            ) : null} */

// useEffect(() => {
//   const messagesRef = collection(db, "messages");
//   const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(100));

//   onSnapshot(messagesQuery, (querySnapshot) => {
//     const data = querySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }));

//     setMessages(data);
//   });
// }, [db]);

// const handleSubmit = (e) => {
//   e.preventDefault();

//   addDoc(collection(db, "messages"), {
//     text: newMessage,
//     createdAt: serverTimestamp(),
//     uid,
//     displayName,
//     photoURL,
//   });

//   setNewMessage("");

//   // scroll down the chat
//   dummySpace.current.scrollIntoView({ behavor: "smooth" });
// };
