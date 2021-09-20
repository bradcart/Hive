import { useUser } from "reactfire";
import { Hero } from "../layouts/Hero";
import { Chatroom } from "../layouts/Chatroom";
import { Navbar } from "../layouts/Navbar";

export default function Home() {
  const { status: loading, data: currentUser } = useUser();

  // TODO: Build Loading Screen component
  // TODO: Clean this up
  return (
    <>
      {loading === "success" && currentUser ? (
        <Chatroom />
      ) : !currentUser ? (
        <>
          <Navbar />
          <Hero />
        </>
      ) : (
        <div style={{ height: "100%", backgroundColor: "#ff0000" }}>
          Loading...
        </div>
      )}
    </>
  );
}
