import { RoomDropdown } from "../components/RoomDropdown";
import { OnlineList } from "../components/UserList";

export const RoomSelector = () => {
  return (
    <div className="info-sidebar">
      <RoomDropdown />
      <OnlineList />
    </div>
  );
};
