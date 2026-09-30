import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHead from "../components/SectionHead";
import { portfolio } from "../data/portfolio";

const STATEMENT =
  "I build the part you don't see. Backends that carry real money, real drivers and real stock — and the tests that prove every number adds up. I lead the teams that ship them, and I use AI to bring the front end to life.";

const KEY = new Set(["don't", "see.", "money,", "drivers", "stock", "prove", "adds", "up.", "lead", "AI"]);

function LitWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={KEY.has(word) ? "lit lit--key" : "lit"}>
      {word}{" "}
    </motion.span>
  );
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

export default function About() {
  const text = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: text, offset: ["start 0.85", "end 0.45"] });
  const words = STATEMENT.split(" ");

  const stats = [
    { value: <Counter to={4} prefix="~" />, label: "years in the Laravel ecosystem" },
    { value: <Counter to={330} suffix="+" />, label: "automated tests guarding one payroll" },
    { value: <Counter to={portfolio.projects.length} />, label: "projects shipped and listed here" },
    { value: <>BSc</>, label: "Mathematical Statistics, University of Damascus" },
  ];

  return (
    <section className="station about" id="about">
      <div className="station__inner">
        <SectionHead num="01" route="/about" title={<>Who is <em>behind</em> the endpoint</>} />

        <p ref={text} className="about__statement">
          {words.map((w, i) => (
            <LitWord
              key={i}
              word={w}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 3) / words.length)]}
            />
          ))}
        </p>

        <div className="about__stats">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
