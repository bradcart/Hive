import { Logo } from "../components/Logo";
import { RoomDropdown } from "../components/RoomDropdown";
import { UserList } from "../components/UserList";

export const Sidebar = ({ currentUser }) => {
  return (
    <div className="sidebar">
      <Logo />
      {currentUser ? (
        <>
          <RoomDropdown />
          <UserList />
        </>
      ) : null}
    </div>
  );
};
