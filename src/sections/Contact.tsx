import { motion } from "framer-motion";
import type { ReactNode } from "react";
import SectionHead from "../components/SectionHead";
import VisitorCounter from "../components/VisitorCounter";
import { portfolio } from "../data/portfolio";

const { personal, languages } = portfolio;
const CV_URL = `${import.meta.env.BASE_URL}Homam-Almasri-CV.pdf`;

const k = (s: string) => <span className="j-key">"{s}"</span>;
const v = (s: string, href?: string) =>
  href ? (
    <a className="j-str j-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      "{s}"
    </a>
  ) : (
    <span className="j-str">"{s}"</span>
  );

const BODY: ReactNode[] = [
  <>{"{"}</>,
  <>  {k("name")}: {v(personal.name)},</>,
  <>  {k("role")}: {v(personal.title)},</>,
  <>  {k("email")}: {v(personal.email, `mailto:${personal.email}`)},</>,
  <>  {k("phone")}: [{v(personal.phone, `tel:${personal.phone.replace(/\s/g, "")}`)}, {v(personal.phone2, `tel:${personal.phone2.replace(/\s/g, "")}`)}],</>,
  <>  {k("location")}: {v(personal.location)},</>,
  <>  {k("status")}: <span className="j-ok">"open to new opportunities"</span>,</>,
  <>  {k("languages")}: {"{ "}{languages.map((l, i) => <span key={l.name}>{k(l.name)}: {v(l.level)}{i < languages.length - 1 ? ", " : ""}</span>)}{" }"},</>,
  <>  {k("links")}: {"{"}</>,
  <>    {k("github")}: {v("github.com/Homam-Almasri", personal.socials.github)},</>,
  <>    {k("linkedin")}: {v("linkedin.com/in/homam-almasri", personal.socials.linkedin)},</>,
  <>    {k("cv")}: {v("Homam-Almasri-CV.pdf", CV_URL)}</>,
  <>  {"}"}</>,
  <>{"}"}</>,
];

export default function Contact() {
  return (
    <section className="station contact" id="contact">
      <div className="station__inner station__inner--wide">
        <SectionHead
          num="05"
          route="/contact"
          title={<>Let's build something that <em>adds up</em>.</>}
          sub="Your request made it all the way through. Here is the response."
        />

        <div className="contact__grid">
          <motion.div
            className="response"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="response__bar">
              <span className="response__lights" aria-hidden>
                <i /> <i /> <i />
              </span>
              <span>response · homam-almasri.dev</span>
            </div>
            <div className="response__headers">
              <p>
                <span className="j-ok">HTTP/2 200 OK</span>
              </p>
              <p>content-type: application/json</p>
              <p>x-response-time: 9ms</p>
            </div>
            <pre className="response__body">
              {BODY.map((line, i) => (
                <motion.span
                  key={i}
                  className="response__line"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                >
                  <span className="response__ln">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </motion.span>
              ))}
            </pre>
          </motion.div>

          <motion.div
            className="contact__actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="big-link" href={`mailto:${personal.email}`}>
              <span className="big-link__label">POST /email</span>
              <span className="big-link__text">Send me an email</span>
              <span className="big-link__arrow" aria-hidden>→</span>
            </a>
            <a className="big-link" href={CV_URL} target="_blank" rel="noopener noreferrer">
              <span className="big-link__label">GET /cv.pdf</span>
              <span className="big-link__text">Download my CV</span>
              <span className="big-link__arrow" aria-hidden>↓</span>
            </a>
            <a className="big-link" href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="big-link__label">GET /linkedin</span>
              <span className="big-link__text">Connect on LinkedIn</span>
              <span className="big-link__arrow" aria-hidden>↗</span>
            </a>
            <a className="big-link" href={personal.socials.github} target="_blank" rel="noopener noreferrer">
              <span className="big-link__label">GET /github</span>
              <span className="big-link__text">Read my code</span>
              <span className="big-link__arrow" aria-hidden>↗</span>
            </a>
          </motion.div>
        </div>

        <footer className="footer">
          <p>
            © {new Date().getFullYear()} {personal.name} · Built with React, Three.js and a lot of requests
          </p>
          <VisitorCounter goatcounterCode="homam" />
        </footer>
      </div>
    </section>
  );
}
