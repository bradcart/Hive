import { AnimatePresence } from "framer-motion";
// import { FirebaseAppProvider } from "reactfire";
// import { FirebaseComponents } from "../firebase/clientAppNew";
import { FirebaseProvider } from "../firebase/clientAppNew";
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
