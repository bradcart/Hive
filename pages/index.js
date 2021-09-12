import { useUser } from "../context/userContext";
import { Hero } from "../layouts/Hero";
import { Chatroom } from "../layouts/Chatroom";
import { Navbar } from "../layouts/Navbar";

export default function Home() {
  const { currentUser, loadingCurrentUser } = useUser();

  // TODO: Build Loading Screen component
  return (
    <>
      {!loadingCurrentUser && currentUser ? (
        <Chatroom />
      ) : !loadingCurrentUser && !currentUser ? (
        <>
          <Navbar />
          <Hero />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
