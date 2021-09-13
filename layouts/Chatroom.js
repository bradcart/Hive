import { useOnlinePresence } from "../firebase/clientApp";
import { RoomList } from "../components/RoomList";
import { UserList } from "../components/UserList";
import { MessageList } from "../components/MessageList";

export const Chatroom = () => {
  useOnlinePresence();

  return (
    <main id="chatroom">
      <div className="chatroom-content">
        <RoomList />
        <UserList />
        <MessageList />
      </div>
    </main>
  );
};
