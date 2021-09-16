import { useState, useEffect } from "react";
import { useRoom } from "../context/roomContext";
import { db } from "../firebase/clientApp";
import { LogoIcon } from "../components/Logo";

export const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { currentRoom, updateRoomState } = useRoom();

  useEffect(() => {
    const roomsRef = db.collection("rooms");
    const unsubscribe = roomsRef.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRooms(data);
    });
    return () => unsubscribe();
  }, []);

  function getFirstLetter(string) {
    const letters = string.split("");
    return letters[0].toUpperCase();
  }

  return (
    <div className="chatroom-sidebar">
      <div className="sidebar-logo">
        <LogoIcon />
        <div className="sidebar-separator" />
      </div>
      {rooms.map((room) => (
        <button
          key={room.id}
          className={
            room.id === currentRoom ? "room-logo--active" : "room-logo"
          }
          onClick={() => updateRoomState(room.id)}
        >
          {getFirstLetter(room.id)}
        </button>
      ))}
    </div>
  );
};
