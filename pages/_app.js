import { AnimatePresence } from "framer-motion";
import { FirebaseProvider } from "../firebase/clientApp";
import RoomProvider from "../context/roomContext";
import TypingProvider from "../context/typingContext";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <RoomProvider>
        <TypingProvider>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </TypingProvider>
      </RoomProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
