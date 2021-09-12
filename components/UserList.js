import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../firebase/clientApp";
import { Logo } from "./Logo";

export const UserList = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // const userStatusRef = db.collection("status");
    // const userStatusQuery = userStatusRef.where("state", "==", "online");

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
    <div className="userlist">
      <div className="logo">
        <Logo />
      </div>
      {onlineUsers.length > 0
        ? onlineUsers.map((user, index) => (
            <>
              <div key={user.id} className="userlist__user">
                <span className="userlist__avatar">
                  <Image
                    className="avatar"
                    src={user.photoURL}
                    alt={`${user.displayName}`}
                    width={36}
                    height={36}
                    layout="fixed"
                  />
                </span>
                {user.displayName}
              </div>
              {/* {console.log(index)}
              {console.log(onlineUsers.length)} */}
              {index === onlineUsers.length - 1 ? null : (
                <hr className="userlist__separator" />
              )}
            </>
          ))
        : null}
    </div>
  );
};
