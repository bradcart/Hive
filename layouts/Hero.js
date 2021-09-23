import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import imgSrc from "../public/hive-landing.jpg";
import { Logo } from "../components/Logo";

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
      <div className="hero__logo">
        <Logo />
      </div>
      <section className="hero__content">
        <div className="hero__content--text">
          <h1>What&apos;s the buzz?</h1>
          {/* <h2>Some kind of tagline or something should go here ya know.</h2> */}
          <h2>Chat with friends to see what&apos;s going on in your hive.</h2>
        </div>
        <button
          className="hero__content--button"
          onClick={() => signInWithGoogle()}
          // style={{ margin: "40px auto 0 auto" }}
        >
          Sign In With Google
        </button>
      </section>
      <section className="hero__image">
        <Image
          src={imgSrc}
          alt="Welcome to Hive."
          quality={98}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </section>
    </div>
  );
};
