import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      className="skill-bar"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__pct">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { skills } = portfolio;

  return (
    <section className="section" id="skills">
      <motion.div className="section__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="section__label">// skills</p>
        <h2 className="section__title">Technical Arsenal</h2>
        <p className="section__subtitle">Technologies, tools, and leadership skills</p>
      </motion.div>

      <div className="skills__container">
        <motion.div className="skill-group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="skill-group__title"><span className="icon">👔</span> Management</h3>
          {skills.management.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
          ))}
        </motion.div>

        <motion.div className="skill-group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <h3 className="skill-group__title"><span className="icon">⚙️</span> Backend</h3>
          {skills.backend.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
          ))}
        </motion.div>

        <motion.div className="skill-group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="skill-group__title"><span className="icon">🎨</span> Frontend</h3>
          {skills.frontend.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
          ))}
        </motion.div>

        <motion.div className="skill-group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="skill-group__title"><span className="icon">🛠️</span> Tools & DevOps</h3>
          {skills.tools.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
          ))}
          <div style={{ marginTop: 24 }}>
            <h3 className="skill-group__title"><span className="icon">🧠</span> Architecture</h3>
            <div className="skill-concepts">
              {skills.concepts.map((c, i) => (
                <motion.span
                  key={c}
                  className="skill-concept-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
