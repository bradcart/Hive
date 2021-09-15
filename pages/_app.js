import { AnimatePresence } from "framer-motion";
import UserProvider from "../context/userContext";
import RoomProvider from "../context/roomContext";
import TypingProvider from "../context/typingContext";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RoomProvider>
        <TypingProvider>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </TypingProvider>
      </RoomProvider>
    </UserProvider>
  );
}

export default MyApp;
