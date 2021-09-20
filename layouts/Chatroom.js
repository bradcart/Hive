import { useOnlinePresence } from "../firebase/useOnlinePresence";
import { Sidebar } from "./Sidebar";
import { MessageList } from "../components/MessageList";

export const Chatroom = () => {
  useOnlinePresence();

  return (
    <main id="chatroom">
      <div className="chatroom__content">
        <Sidebar />
        <MessageList />
      </div>
    </main>
  );
};
