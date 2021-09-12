import { useState, useEffect } from "react";
import { useRoom } from "../context/roomContext";
import { db } from "../firebase/clientApp";
import { LogoIcon } from "../components/Logo";

export const RoomList = () => {
  const { updateRoomState } = useRoom();

  const [rooms, setRooms] = useState([]);

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

  return (
    <div className="chatroom-sidebar">
      <div className="sidebar-logo">
        <LogoIcon />
        <div className="sidebar-separator" />
      </div>
      {rooms.map((room) => (
        <div
          key={room.id}
          className="room-logo"
          onClick={() => updateRoomState(room.id)}
        >
          {room.id}
        </div>
      ))}
    </div>
  );
};
