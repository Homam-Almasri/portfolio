import { motion } from "framer-motion";
import SectionHead from "../components/SectionHead";
import { portfolio } from "../data/portfolio";

const { skills } = portfolio;

const SERVICES = [
  { key: "backend", name: "backend", color: "#4de2ff", items: skills.backend.map((s) => s.name) },
  { key: "management", name: "leadership", color: "#ffb547", items: skills.management.map((s) => s.name) },
  { key: "frontend", name: "frontend", color: "#ff5fa2", items: skills.frontend.map((s) => s.name) },
  { key: "tools", name: "infra & tools", color: "#3dffa2", items: skills.tools.map((s) => s.name) },
  { key: "concepts", name: "architecture", color: "#8b7bff", items: skills.concepts },
];

export default function Skills() {
  return (
    <section className="station skills" id="skills">
      <div className="station__inner station__inner--wide">
        <SectionHead
          num="04"
          route="/stack"
          title={<>The <em>stack</em>, as a service map</>}
          sub="Every service is up. The network behind this page lights up while you're here."
        />

        <div className="services">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.key}
              className={`service service--${svc.key}`}
              style={{ "--accent": svc.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="service__head">
                <span className="service__name">svc/{svc.name}</span>
                <span className="service__ok">
                  <span className="pulse-dot" /> healthy
                </span>
              </div>
              <ul className="service__items">
                {svc.items.map((it, k) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + k * 0.05 }}
                    data-hot
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
