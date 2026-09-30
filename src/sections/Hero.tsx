import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";
import { scrollToId } from "../lib/journey";

const { personal } = portfolio;
const EASE = [0.16, 1, 0.3, 1] as const;
const REQUEST = "GET /homam-almasri HTTP/2";

function Typed({ text, start }: { text: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [start, text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="caret" />
    </>
  );
}

function Word({ word, delay, ready }: { word: string; delay: number; ready: boolean }) {
  return (
    <span className="hero__word" aria-hidden="true">
      {word.split("").map((ch, i) => (
        <span key={i} className="hero__char-mask">
          <motion.span
            className="hero__char"
            initial={{ y: "115%", rotate: 8 }}
            animate={ready ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section className="station hero" id="hero">
      <div className="station__inner hero__inner">
        <motion.p className="hero__req" {...fade(0.1)}>
          <span className="hero__req-method">REQ</span>
          <Typed text={REQUEST} start={ready} />
        </motion.p>

        <h1 className="hero__name" aria-label={personal.name}>
          <Word word="Homam" delay={0.2} ready={ready} />
          <Word word="Almasri" delay={0.42} ready={ready} />
        </h1>

        <motion.p className="hero__role" {...fade(0.9)}>
          {personal.title}
        </motion.p>

        <motion.p className="hero__lede" {...fade(1.05)}>
          I lead teams and build the systems behind the screen — payroll engines, ERPs,
          real-time services — and I prove they <em>add up</em>.
        </motion.p>

        <motion.div className="hero__actions" {...fade(1.2)}>
          <button className="btn btn--solid" onClick={() => scrollToId("about")}>
            Follow the request
            <span className="btn__arrow" aria-hidden>↓</span>
          </button>
          <a
            className="btn btn--ghost"
            href={`${import.meta.env.BASE_URL}Homam-Almasri-CV.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </motion.div>

        <motion.p className="hero__meta" {...fade(1.35)}>
          <span className="pulse-dot" /> Available for new opportunities
          <span className="hero__meta-sep">/</span>
          {personal.location}
        </motion.p>
      </div>

      <motion.div className="hero__scroll" {...fade(1.6)}>
        <span>scroll to send</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
