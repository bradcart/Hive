import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/clientApp";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loadingUser, setLoadingUser] = useState(true);
  const [currentRoom, setCurrentRoom] = useState("general");

  const authStateHandler = (callback) => {
    return auth.onAuthStateChanged(callback);
  };

  const respondToAuthStateChange = (user) => {
    if (user) {
      setUser(user);
      setLoadingUser(false);
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    const unsubscriber = authStateHandler(respondToAuthStateChange);

    return () => unsubscriber();
  }, []);

  const updateRoomState = (room) => {
    if (room === currentRoom) {
      return null;
    }
    console.log("room changed to " + room);
    return setCurrentRoom(room);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loadingUser, currentRoom, updateRoomState }}
    >
      {children}
    </UserContext.Provider>
  );
}

// custom hook that shorthands the context
export const useUser = () => useContext(UserContext);
