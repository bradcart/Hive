import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../firebase/clientApp";
import { useUser } from "../context/userContext";
import { useRoom } from "../context/roomContext";

export const UserList = () => {
  const { currentRoom } = useRoom();
  const { currentUser } = useUser();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const userStatusRef = db.collection("status");
  const userStatusQuery = userStatusRef
    .where("state", "==", "online")
    .where("inRoom", "==", currentRoom);
  // .orderBy("displayName")

  useEffect(() => {
    const unsubscribe = userStatusQuery.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setOnlineUsers(data);
    });

    return () => unsubscribe();
  }, [currentRoom]);

  return (
    <div className="userlist">
      {onlineUsers.length > 0 &&
      onlineUsers.some(
        (user) => user.displayName === currentUser.displayName
      ) ? (
        <>
          <div className="userlist__title">{currentRoom} Chat</div>
          {onlineUsers.map((user) => (
            <div key={user.id}>
              <div className="userlist__user">
                <span className="userlist__avatar">
                  <Image
                    className="avatar"
                    src={user.photoURL}
                    alt={`${user.displayName}`}
                    width={40}
                    height={40}
                    layout="fixed"
                  />
                </span>
                {user.displayName}
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};
