import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "@firebase/firestore";
import { useRoom } from "../context/roomContext";

const Dropdown = ({ children }) => {
  const { currentRoom } = useRoom();
  return (
    <DropdownMenu.Root className="room-dropdown">
      <DropdownMenu.Trigger className="room-dropdown__trigger">
        {currentRoom}
        <div className="room-dropdown__arrow" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="room-dropdown__content">
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const RoomDropdown = () => {
  const { currentRoom, updateRoomState } = useRoom();
  const firestore = useFirestore();

  const roomsRef = collection(firestore, "rooms");
  const { status, data: rooms } = useFirestoreCollectionData(roomsRef, {
    idField: "id",
  });

  // function getFirstLetter(string) {
  //   const letters = string.split("");
  //   return letters[0].toUpperCase();
  // }

  return (
    <Dropdown>
      {status === "success" &&
        rooms.map((room) => (
          <DropdownMenu.Item
            key={room.id}
            className={
              room.id === currentRoom
                ? "room-dropdown__item"
                : "room-dropdown__item"
            }
            onSelect={() => updateRoomState(room.id)}
          >
            {room.id}
          </DropdownMenu.Item>
        ))}
    </Dropdown>
  );
};
