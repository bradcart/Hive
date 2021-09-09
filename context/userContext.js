import { useState, useEffect, createContext, useContext } from "react";
import { firebase, auth, authStateHandler, db } from "../firebase/clientApp";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loadingUser, setLoadingUser] = useState(true);

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

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, db }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook that shorthands the context
export const useUser = () => useContext(UserContext);
