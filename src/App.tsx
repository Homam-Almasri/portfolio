import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Hud from "./components/Hud";
import Cursor from "./components/Cursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { startJourney, webglAvailable } from "./lib/journey";

const World = lazy(() => import("./components/World"));

const calm = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [ready, setReady] = useState(false);
  const [gl] = useState(() => webglAvailable());

  useEffect(() => startJourney(calm), []);

  // deep links: /portfolio/#projects lands on that station once the page is laid out
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || !document.getElementById(id)) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {gl ? (
        <Suspense fallback={<div className="world world--flat" />}>
          <World calm={calm} />
        </Suspense>
      ) : (
        <div className="world world--flat" />
      )}
      <div className="grain" aria-hidden="true" />
      <Loader calm={calm} onDone={() => setReady(true)} />
      <Hud ready={ready} />
      <Cursor />
      <main className="page">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
