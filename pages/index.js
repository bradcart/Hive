import { useUser } from "../context/userContext";
import { Hero } from "../layouts/Hero";
import { Chatroom } from "../layouts/Chatroom";
import { Navbar } from "../layouts/Navbar";

export default function Home() {
  const { user, loadingUser } = useUser();

  // TODO: Build Loading Screen component
  return (
    <>
      {!loadingUser && user ? (
        <Chatroom />
      ) : !loadingUser && !user ? (
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
