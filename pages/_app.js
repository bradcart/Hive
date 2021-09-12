import "../styles/main.scss";
import UserProvider from "../context/userContext";
import RoomProvider from "../context/roomContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RoomProvider>
        <Component {...pageProps} />
      </RoomProvider>
    </UserProvider>
  );
}

export default MyApp;
