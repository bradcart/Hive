import { useUser, useSigninCheck } from "reactfire";
import { Hero } from "../layouts/Hero";
import { Chatroom } from "../layouts/Chatroom";
import { Sidebar } from "../layouts/Sidebar";
// import { useEffect } from "react";

export default function Home() {
  const { data: currentUser } = useUser();
  const { status, data: signInCheckResult } = useSigninCheck();

  // useEffect(() => {
  //   console.log("currentUser: " + currentUser);
  //   console.log("status: " + status);
  //   console.log("signInCheckResult: " + signInCheckResult);
  // }, [currentUser, status, signInCheckResult]);

  // TODO: Build Loading Screen component
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar currentUser={currentUser} />
      {
        signInCheckResult && signInCheckResult.signedIn === true ? (
          <Chatroom currentUser={currentUser} />
        ) : signInCheckResult && signInCheckResult.signedIn === false ? (
          <Hero />
        ) : null
        // <div
        //   style={{
        //     height: "100vh",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // >
        //   <h2>Loading...</h2>
        // </div>
      }
    </div>
  );
}
