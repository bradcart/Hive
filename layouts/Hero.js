import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import imgSrc from "../public/landing3.jpg";

export const Hero = () => {
  const auth = useAuth();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="hero">
      <div className="hero__content">
        <div>
          <h1>What&apos;s the buzz?</h1>
          <h2>Some kind of tagline or something should go here ya know.</h2>
        </div>
        <button
          className="hero__button"
          onClick={() => signInWithGoogle()}
          style={{ margin: "40px auto 0 auto" }}
        >
          Sign In With Google
        </button>
      </div>
      <div className="hero__image">
        <Image
          src={imgSrc}
          alt="Welcome to Hive."
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>
    </div>
  );
};
