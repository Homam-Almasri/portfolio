import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { journey, onStation, scrollToId, STATIONS } from "../lib/journey";

const LATENCY = [12, 18, 24, 31, 16, 9];
const CV_URL = `${import.meta.env.BASE_URL}Homam-Almasri-CV.pdf`;

export default function Hud({ ready }: { ready: boolean }) {
  const [station, setStation] = useState(0);
  const bar = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => onStation(setStation), []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = journey.progress;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (pct.current) pct.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = STATIONS[station];

  return (
    <motion.div
      className="hud"
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <header className="hud__top">
        <button className="hud__brand" onClick={() => scrollToId("hero")} aria-label="Back to top">
          <span className="hud__dot" />
          homam<span className="hud__brand-dim">.almasri</span>
        </button>
        <nav className="hud__nav" aria-label="Sections">
          {STATIONS.slice(1).map((st, i) => (
            <button
              key={st.id}
              className={`hud__link ${station === i + 1 ? "is-active" : ""}`}
              onClick={() => scrollToId(st.id)}
            >
              <span className="hud__link-num">0{i + 1}</span>
              {st.route}
            </button>
          ))}
        </nav>
        <a className="hud__cv" href={CV_URL} target="_blank" rel="noopener noreferrer">
          CV <span aria-hidden>↓</span>
        </a>
      </header>

      <div className="hud__req" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            className="hud__req-line"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="hud__method">{s.method}</span>
            <span className="hud__route">{s.route}</span>
            <span className="hud__status">200</span>
            <span className="hud__ms">{LATENCY[station]}ms</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hud__progress">
        <span className="hud__progress-label">payload</span>
        <span className="hud__progress-track">
          <span ref={bar} className="hud__progress-fill" />
        </span>
        <span ref={pct} className="hud__progress-pct">000</span>
      </div>
    </motion.div>
  );
}
