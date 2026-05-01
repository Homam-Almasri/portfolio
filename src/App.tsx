import { useState } from "react";
import Scene3D from "./components/Scene3D";
import Navbar from "./components/Navbar";
import SecretHeart from "./components/SecretHeart";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import LovePage from "./sections/LovePage";

export default function App() {
  const [showLove, setShowLove] = useState(false);

  return (
    <>
      {showLove ? (
        <LovePage onBack={() => setShowLove(false)} />
      ) : (
        <>
          <Scene3D />
          <div className="page-content">
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
          <SecretHeart onUnlock={() => setShowLove(true)} />
        </>
      )}
    </>
  );
}
