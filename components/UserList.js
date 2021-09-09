import { useEffect, useState } from "react";
import { db } from "../firebase/clientApp";

export const UserList = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const userStatusRef = db.collection("status");
    const userStatusQuery = userStatusRef.where("state", "==", "online");

    db.collection("status")
      .where("state", "==", "online")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setOnlineUsers(data);
      });
  }, []);

  //   useEffect(() => {
  //     console.log(onlineUsers);
  //   }, [onlineUsers]);

  return (
    <div>
      <div>
        {onlineUsers.length > 0
          ? onlineUsers.map((user) => (
              <span key={user.id}>{user.displayName}</span>
            ))
          : null}
      </div>
    </div>
  );
};
