import { useState, createContext, useContext } from "react";

export const RoomContext = createContext();

export default function RoomContextComp({ children }) {
  const [currentRoom, setCurrentRoom] = useState("general");

  const updateRoomState = (room) => {
    if (room === currentRoom) {
      return null;
    }
    return setCurrentRoom(room);
  };

  return (
    <RoomContext.Provider value={{ currentRoom, updateRoomState }}>
      {children}
    </RoomContext.Provider>
  );
}

// custom hook that shorthands the context
export const useRoom = () => useContext(RoomContext);
