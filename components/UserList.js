import Image from "next/image";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, where } from "@firebase/firestore";
import { useRoom } from "../context/roomContext";

export const UserList = () => {
  const { currentRoom } = useRoom();

  const firestore = useFirestore();
  const usersRef = collection(firestore, "status");
  const usersQuery = query(
    usersRef,
    where("state", "==", "online"),
    where("inRoom", "==", currentRoom)
  );

  const { status: loading, data: onlineUsers } = useFirestoreCollectionData(
    usersQuery,
    {
      idField: "id",
    }
  );

  return (
    <section className="user-list">
      {loading === "success" && onlineUsers.length > 0 ? (
        <>
          <span className="user-list__header">
            {onlineUsers.length}&nbsp;
            {onlineUsers.length > 1 ? " users online" : " user online"}
          </span>
          {onlineUsers.map((user) => (
            <div key={user.id} className="user-list__item">
              <span className="user-list__item--avatar">
                <Image
                  className="avatar"
                  src={user.photoURL}
                  alt={`${user.displayName}`}
                  layout="fixed"
                  width={56}
                  height={56}
                  quality={100}
                />
              </span>
              {/* <div className="green-dot" /> */}
              <span className="user-list__item--name">{user.displayName}</span>
            </div>
          ))}
        </>
      ) : null}
    </section>
  );
};
