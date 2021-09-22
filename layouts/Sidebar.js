import { Logo } from "../components/Logo";
import { RoomDropdown } from "../components/RoomDropdown";
import { OnlineList } from "../components/UserList";

export const Sidebar = ({ currentUser }) => {
  return (
    <div className="sidebar">
      <Logo />
      {currentUser ? (
        <>
          <RoomDropdown />
          <OnlineList />
        </>
      ) : null}
    </div>
  );
};
