import Image from "next/image";
import { motion } from "framer-motion";
// import formatRelative from "date-fns/formatRelative";
import { useUser, useFirestore, useFirestoreCollectionData } from "reactfire";
import {
  collection,
  query,
  doc,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { useRoom } from "../context/roomContext";
import { MessageInput } from "./MessageInput";

export const MessageList = () => {
  /* contexts */
  const { currentRoom } = useRoom();
  const { data: currentUser } = useUser();
  const firestore = useFirestore();

  /* refs */
  const roomsRef = collection(firestore, "rooms");
  const currentRoomRef = doc(roomsRef, currentRoom);
  const messagesRef = collection(currentRoomRef, "messages");

  /* query */
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt"),
    limitToLast(15)
  );

  /* subscribe to collection */
  const { status: loadStatus, data: messages } = useFirestoreCollectionData(
    messagesQuery,
    {
      idField: "id",
    }
  );

  /* determine if a message is from currentUser */
  function sentByUser(userId) {
    if (userId === currentUser.uid) {
      return true;
    } else {
      return false;
    }
  }

  // function diffUserThanLast(message, index) {
  //   const previousMessage = messages[index - 1];
  //   if (message.uid && previousMessage && previousMessage.uid !== message.uid) {
  //     return true;
  //   } else if (index === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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
      <ul className="message-list">
        {loadStatus === "success" &&
          messages.map((message, index) => (
            <li
              className={
                sentByUser(message.uid) ? "list-item--sent" : "list-item"
              }
              key={message.id}
            >
              <motion.div
                className="motion-div"
                variants={messageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <div
                  className={
                    sentByUser(message.uid)
                      ? "list-item__inner--sent"
                      : "list-item__inner"
                  }
                >
                  <div className="avatar-wrapper">
                    {message.photoURL ? (
                      <Image
                        className="avatar"
                        src={replacePhotoUrl(message.photoURL)}
                        alt={`${message.displayName}'s avatar`}
                        width={100}
                        height={100}
                        quality={95}
                        layout="fixed"
                      />
                    ) : null}
                  </div>

                  <div className="name-text-wrapper">
                    <span className="name">{message.displayName}</span>
                    <p className="text">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            </li>
          ))}
      </ul>

      {loadStatus === "success" && messages.length > 0 ? (
        <MessageInput
          currentRoom={currentRoom}
          uid={currentUser.uid}
          displayName={currentUser.displayName}
          photoURL={currentUser.photoURL}
        />
      ) : null}
    </div>
  );
};
