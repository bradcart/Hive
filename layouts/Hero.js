import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { Button } from "../components/Button";
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
      <div className="hero-content">
        <div>
          <h1>
            What&apos;s
            <br />
            the buzz?
          </h1>
          <h2 style={{ marginLeft: "10px", marginTop: "40px" }}>
            Some kind of tagline or something should go here ya know.
          </h2>
        </div>
        <Button
          onClick={() => signInWithGoogle()}
          variant="primary"
          style={{ margin: "40px auto 0 auto" }}
        >
          Sign In With Google
        </Button>
      </div>
      <div className="hero-image">
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
