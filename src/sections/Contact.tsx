import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

const { personal, languages } = portfolio;

export default function Contact() {
  return (
    <section className="section" id="contact">
      <motion.div className="section__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="section__label">// contact</p>
        <h2 className="section__title">Let's Connect</h2>
        <p className="section__subtitle">Have a project in mind? Let's build something amazing together.</p>
      </motion.div>

      <motion.div
        className="contact__wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="contact__card">
          <div className="contact__links">
            <a href={`mailto:${personal.email}`} className="contact__link">
              <span className="contact__link-icon">📧</span>
              <span>{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone}`} className="contact__link">
              <span className="contact__link-icon">📱</span>
              <span>{personal.phone}</span>
            </a>
            <a href={`tel:${personal.phone2}`} className="contact__link">
              <span className="contact__link-icon">📱</span>
              <span>{personal.phone2}</span>
            </a>
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__link-icon">💻</span>
              <span>GitHub Profile</span>
            </a>
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__link-icon">🔗</span>
              <span>LinkedIn Profile</span>
            </a>
          </div>

          <div className="contact__languages">
            {languages.map((lang) => (
              <div key={lang.name} className="lang-badge">
                <span className="flag">{lang.flag}</span>
                <span>{lang.name}</span>
                <span className="level">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <footer className="footer">
        <p>
          Built with <span style={{ color: "var(--accent-pink)" }}>♥</span> using React + Three.js •{" "}
          <a href={personal.socials.github}>Homam Al-Masri</a> © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
