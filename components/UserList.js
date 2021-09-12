import { useEffect, useState } from "react";
import Image from "next/image";
import { db, auth } from "../firebase/clientApp";
import { useUser } from "../context/userContext";

export const UserList = () => {
  const { currentRoom } = useUser();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const userStatusRef = db.collection("status");
    const userStatusQuery = userStatusRef
      .where("state", "==", "online")
      .where("inRoom", "==", currentRoom);
    // .orderBy("displayName")

    // setOnlineUsers([]);

    const unsubscribe = userStatusQuery.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setOnlineUsers(data);
    });

    return () => unsubscribe();
  }, [currentRoom]);

  /* the .some() check is probably unnecessary */
  return (
    <div className="userlist">
      {onlineUsers.length > 0 &&
      onlineUsers.some(
        (user) => user.displayName === auth.currentUser.displayName
      ) ? (
        <>
          <div className="logo">{currentRoom}</div>
          {onlineUsers.map((user) => (
            <div key={user.id}>
              <div className="userlist__user">
                <span className="userlist__avatar">
                  <Image
                    className="avatar"
                    src={user.photoURL}
                    alt={`${user.displayName}`}
                    width={32}
                    height={32}
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

// const sortedData = data.sort((a, b) => {
//   let nameA = a.displayName.toLowerCase(),
//     nameB = b.displayName.toLowerCase();
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }
//   return 0;
// });
