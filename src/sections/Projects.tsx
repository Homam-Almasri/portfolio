import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <motion.div className="section__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="section__label">// projects</p>
        <h2 className="section__title">Things I've Built</h2>
        <p className="section__subtitle">From robust backends to AI-powered tools and 3D experiences</p>
      </motion.div>

      <div className="projects__grid">
        {portfolio.projects.map((project, i) => (
          <motion.div
            key={project.name}
            className="project-card"
            style={{ "--card-accent": project.color } as React.CSSProperties}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-card__icon">{project.icon}</div>
            <h3 className="project-card__name">{project.name}</h3>
            <div className="project-card__type">{project.type}</div>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__tech">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
