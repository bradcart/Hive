import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/clientApp";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);

  const respondToAuthStateChange = (user) => {
    if (user) {
      setCurrentUser(user);
      setLoadingCurrentUser(false);
    } else {
      setCurrentUser(null);
      setLoadingCurrentUser(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(respondToAuthStateChange);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loadingCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// custom hook that shorthands the context
export const useUser = () => useContext(UserContext);
