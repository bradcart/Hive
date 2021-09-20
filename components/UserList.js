// import Image from "next/image";
import { useRoom } from "../context/roomContext";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, where } from "@firebase/firestore";

export const OnlineList = () => {
  const { currentRoom } = useRoom();
  // const { data: currentUser } = useUser();

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
    <div className="online-list">
      {loading === "success" ? (
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
