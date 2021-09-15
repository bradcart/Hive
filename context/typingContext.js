import { useState, createContext, useContext } from "react";

export const TypingContext = createContext();

export default function TypingContextComp({ children }) {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <TypingContext.Provider
      value={{
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
}

// custom hook that shorthands the context
export const useTyping = () => useContext(TypingContext);
