import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <motion.div className="section__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="section__label">// experience</p>
        <h2 className="section__title">Work History</h2>
        <p className="section__subtitle">Where I've built and shipped real products</p>
      </motion.div>

      <div className="timeline">
        {portfolio.experience.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline__item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
          >
            <div className="timeline__dot" />
            <div className="timeline__card">
              <div className="timeline__header">
                <div>
                  <div className="timeline__role">{exp.title}</div>
                  <div className="timeline__company">{exp.company}</div>
                </div>
                <div className="timeline__meta">
                  <span className="timeline__type-badge">{exp.type}</span>
                  <span>📅 {exp.period}</span>
                  <span>📍 {exp.location}</span>
                </div>
              </div>
              <ul className="timeline__highlights">
                {exp.highlights.map((h, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + j * 0.06 }}
                  >
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Achievements */}
      <motion.div className="section__header" style={{ marginTop: 60 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="section__label">// key achievements</p>
        <h2 className="section__title">Impact & Results</h2>
      </motion.div>

      <div className="achievements__grid">
        {portfolio.achievements.map((ach, i) => (
          <motion.div
            key={i}
            className="achievement__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <span className="achievement__icon">🏆</span>
            <span>{ach}</span>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <motion.div className="section__header" style={{ marginTop: 60 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="section__label">// education</p>
        <h2 className="section__title">Academic Background</h2>
      </motion.div>

      {portfolio.education.map((edu, i) => (
        <motion.div
          key={i}
          className="education__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="education__icon">🎓</div>
          <div>
            <div className="education__degree">{edu.degree}</div>
            <div className="education__school">{edu.institution}</div>
            <div className="education__details">
              <span>📅 {edu.period}</span>
              <span>📊 GPA: {edu.gpa}</span>
              <span>📈 {edu.percentage}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
