import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

const { personal } = portfolio;

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="dot" />
          Available for new opportunities
        </motion.div>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        <motion.p
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {personal.title}
        </motion.p>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a href="#projects" className="btn btn--primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="line" />
      </motion.div>
    </section>
  );
}
