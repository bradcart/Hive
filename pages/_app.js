import { AnimatePresence } from "framer-motion";
// import { FirebaseAppProvider } from "reactfire";
// import { FirebaseComponents } from "../firebase/clientAppNew";
import { FirebaseProvider } from "../firebase/clientAppNew";
import UserProvider from "../context/userContext";
import RoomProvider from "../context/roomContext";
import TypingProvider from "../context/typingContext";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <UserProvider>
        <RoomProvider>
          <TypingProvider>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} />
            </AnimatePresence>
          </TypingProvider>
        </RoomProvider>
      </UserProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
