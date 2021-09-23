import { useOnlinePresence } from "../firebase/useOnlinePresence";
import { Sidebar } from "./Sidebar";
import { MessageList } from "../components/MessageList";

export const Chatroom = ({ currentUser }) => {
  useOnlinePresence();

  return (
    <div className="chatroom">
      <div className="chatroom__content">
        <Sidebar currentUser={currentUser} />
        <MessageList currentUser={currentUser} />
      </div>
    </div>
  );
};
