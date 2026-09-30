import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import SectionHead from "../components/SectionHead";
import { portfolio } from "../data/portfolio";

const LEVEL: Record<string, { tag: string; cls: string }> = {
  "Technical Project Manager": { tag: "LEAD", cls: "lead" },
  "Freelance & Contract Work": { tag: "SHIP", cls: "ship" },
  "Back-End Laravel Developer": { tag: "BUILD", cls: "build" },
};

export default function Experience() {
  const [open, setOpen] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="station experience" id="experience">
      <div className="station__inner">
        <SectionHead
          num="02"
          route="/experience"
          title={<>The <em>log</em></>}
          sub="Every entry since the first commit. Open one to read its trace."
        />

        <ol ref={list} className="log">
          <span className="log__rail" aria-hidden>
            <motion.span className="log__rail-fill" style={{ scaleY: fill }} />
          </span>
          {portfolio.experience.map((job, i) => {
            const level = LEVEL[job.title] ?? { tag: "QA", cls: "qa" };
            const isOpen = open === i;
            return (
              <motion.li
                key={job.title + job.period}
                className={`log__entry ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="log__head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="log__node" aria-hidden />
                  <span className="log__time">{job.period}</span>
                  <span className={`log__level log__level--${level.cls}`}>{level.tag}</span>
                  <span className="log__title">
                    {job.title}
                    <span className="log__company"> @ {job.company}</span>
                  </span>
                  <span className="log__toggle" aria-hidden>{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="log__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="log__where">
                        {job.location} · {job.type} · {job.duration}
                      </p>
                      <ul className="log__trace">
                        {job.highlights.map((h, k) => (
                          <li key={k}>
                            <span className="log__ln">{String(k + 1).padStart(2, "0")}</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
          {portfolio.education.map((e) => (
            <li key={e.degree} className="log__entry log__entry--edu">
              <div className="log__head log__head--static">
                <span className="log__node" aria-hidden />
                <span className="log__time">{e.period}</span>
                <span className="log__level log__level--edu">INIT</span>
                <span className="log__title">
                  {e.degree}
                  <span className="log__company"> @ {e.institution} · GPA {e.gpa}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
