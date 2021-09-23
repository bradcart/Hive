import { useUser, useSigninCheck } from "reactfire";
import Div100vh from "react-div-100vh";
import { Hero } from "../layouts/Hero";
import { Chatroom } from "../layouts/Chatroom";
// import { useEffect } from "react";

export default function Home() {
  const { data: currentUser } = useUser();
  const { data: signInCheckResult } = useSigninCheck();

  // useEffect(() => {
  //   console.log("currentUser: " + currentUser);
  //   console.log("status: " + status);
  //   console.log("signInCheckResult: " + signInCheckResult);
  // }, [currentUser, status, signInCheckResult]);

  // TODO: Build Loading Screen component
  return (
    <Div100vh style={{ overflow: "hidden", overscrollBehaviorY: "none" }}>
      {
        signInCheckResult && signInCheckResult.signedIn ? (
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
    </Div100vh>
  );
}
