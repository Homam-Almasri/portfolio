import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function About() {
  return (
    <section className="section" id="about">
      <motion.div className="section__header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={0}>
        <p className="section__label">// about me</p>
        <h2 className="section__title">Who I Am</h2>
        <p className="section__subtitle">A backend craftsman with a passion for full-stack innovation</p>
      </motion.div>

      <div className="about__grid">
        <motion.div className="about__visual" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
          <div className="about__avatar-ring">
            <div className="about__avatar-inner">👨‍💻</div>
          </div>
          <div className="about__floating-badge">🚀 Laravel Expert</div>
          <div className="about__floating-badge">🤖 AI Integration</div>
          <div className="about__floating-badge">📊 Math & Stats</div>
        </motion.div>

        <motion.div className="about__info" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p className="about__text" variants={fadeUp} custom={1}>
            {portfolio.personal.summary}
          </motion.p>
          <motion.p className="about__text" variants={fadeUp} custom={2}>
            Beyond backend development, I leverage AI tools to guide the creation of stunning React frontends
            and 3D web experiences — like the <strong style={{ color: "var(--accent-cyan)" }}>JoyBox 3D Platform</strong> and
            this very portfolio you're viewing right now.
          </motion.p>

          <motion.div className="about__stats" variants={fadeUp} custom={3}>
            <div className="about__stat">
              <div className="about__stat-value">3+</div>
              <div className="about__stat-label">Years Exp.</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-value">8+</div>
              <div className="about__stat-label">Projects</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-value">BSc</div>
              <div className="about__stat-label">Math Stats</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
