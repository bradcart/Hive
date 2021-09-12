// import { useEffect, useRef, useState } from "react";
// import { formatRelative } from "date-fns";
import { useOnlinePresence } from "../firebase/clientApp";
import { RoomList } from "../components/RoomList";
import { UserList } from "../components/UserList";
import { MessageList } from "../components/MessageList";

export const Chatroom = () => {
  useOnlinePresence();

  return (
    <main id="chatroom">
      <div className="chatroom-content">
        <RoomList />
        <UserList />
        <MessageList />
      </div>
    </main>
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
