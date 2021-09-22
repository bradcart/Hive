import { useOnlinePresence } from "../firebase/useOnlinePresence";
import { MessageList } from "../components/MessageList";

export const Chatroom = ({ currentUser }) => {
  useOnlinePresence();

  return (
    <div className="chatroom">
      <div className="chatroom__content">
        <MessageList currentUser={currentUser} />
      </div>
    </div>
  );
};
