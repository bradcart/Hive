import { Logo } from "../components/Logo";
import { RoomSelector } from "./RoomSelector";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Logo />
      <RoomSelector />
    </div>
  );
};
