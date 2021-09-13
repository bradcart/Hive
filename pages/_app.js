import { AnimatePresence } from "framer-motion";
import UserProvider from "../context/userContext";
import RoomProvider from "../context/roomContext";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RoomProvider>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </RoomProvider>
    </UserProvider>
  );
}

export default MyApp;
