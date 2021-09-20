import { useState, useEffect } from "react";
import { useRoom } from "../context/roomContext";
// import { db } from "../firebase/clientApp";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "@firebase/firestore";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Dropdown = ({ children }) => {
  const { currentRoom } = useRoom();
  return (
    <DropdownMenu.Root className="dropdown">
      <DropdownMenu.Trigger className="dropdown__trigger">
        {currentRoom}
        <div className="dropdown__arrow" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="dropdown__content">
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const RoomDropdown = () => {
  // const [rooms, setRooms] = useState([]);
  const { currentRoom, updateRoomState } = useRoom();
  const firestore = useFirestore();

  const roomsRef = collection(firestore, "rooms");
  const { status, data: rooms } = useFirestoreCollectionData(roomsRef, {
    idField: "id",
  });

  // useEffect(() => {
  // const roomsRef = db.collection("rooms");

  // const unsubscribe = roomsRef.onSnapshot((snap) => {
  //   const data = snap.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setRooms(data);
  // });

  //   return () => unsubscribe();
  // }, []);

  function getFirstLetter(string) {
    const letters = string.split("");
    return letters[0].toUpperCase();
  }

  return (
    <Dropdown>
      {status === "success" &&
        rooms.map((room) => (
          <DropdownMenu.Item
            key={room.id}
            className={
              room.id === currentRoom ? "dropdown__item" : "dropdown__item"
            }
            onSelect={() => updateRoomState(room.id)}
          >
            {room.id}
          </DropdownMenu.Item>
        ))}
    </Dropdown>
  );
};
