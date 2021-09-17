import { useEffect, useState } from "react";
// import Image from "next/image";
import { db } from "../firebase/clientApp";
import { useUser } from "../context/userContext";
import { useRoom } from "../context/roomContext";

export const OnlineList = () => {
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
    <div className="online-list">
      {onlineUsers.length > 0 &&
      onlineUsers.some(
        (user) => user.displayName === currentUser.displayName
      ) ? (
        <>
          <div className="online-list__header">
            {onlineUsers.length}&nbsp;
            {onlineUsers.length > 1 ? " users online" : " user online"}
          </div>
          {onlineUsers.map((user) => (
            <div key={user.id} className="online-list__item">
              {/* <span className="online-list__avatar">
                  <Image
                    className="avatar"
                    src={user.photoURL}
                    alt={`${user.displayName}`}
                    width={40}
                    height={40}
                    layout="fixed"
                  />
                </span> */}
              <div className="green-dot" />
              {user.displayName}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};
