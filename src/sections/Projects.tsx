import { motion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import SectionHead from "../components/SectionHead";
import { portfolio } from "../data/portfolio";

type Project = (typeof portfolio.projects)[number];

const slug = (name: string) =>
  name
    .split("—")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Feature({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);

  const move = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.article
      ref={ref}
      className={`feature ${i === 0 ? "feature--wide" : ""}`}
      style={{ "--accent": p.color } as React.CSSProperties}
      onPointerMove={move}
      onPointerLeave={leave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-hot
    >
      <div className="feature__glare" aria-hidden />
      <div className="feature__top">
        <span className="feature__num">{String(i + 1).padStart(2, "0")}</span>
        <span className="feature__type">{p.type}</span>
        <span className="feature__status">
          <span className="pulse-dot" /> 200
        </span>
      </div>
      <p className="feature__endpoint">GET /work/{slug(p.name)}</p>
      <h3 className="feature__name">{p.name}</h3>
      <p className="feature__desc">{p.description}</p>
      <ul className="feature__tech">
        {p.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <span className="feature__icon" aria-hidden>{p.icon}</span>
    </motion.article>
  );
}

export default function Projects() {
  const featured = portfolio.projects.slice(0, 4);
  const rest = portfolio.projects.slice(4);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="station projects" id="projects">
      <div className="station__inner station__inner--wide">
        <SectionHead
          num="03"
          route="/work"
          title={<>Deployed to <em>production</em></>}
          sub="The systems I built, led or rescued. The first four are the ones I'd open first."
        />

        <div className="features">
          {featured.map((p, i) => (
            <Feature key={p.name} p={p} i={i} />
          ))}
        </div>

        <div className="endpoints">
          <p className="endpoints__head">
            <span>more endpoints</span>
            <span>{rest.length} routes</span>
          </p>
          <ul>
            {rest.map((p, i) => (
              <motion.li
                key={p.name}
                className={`endpoint ${hover === i ? "is-hover" : ""}`}
                style={{ "--accent": p.color } as React.CSSProperties}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                data-hot
              >
                <span className="endpoint__method">GET</span>
                <span className="endpoint__path">/work/{slug(p.name)}</span>
                <span className="endpoint__name">{p.name}</span>
                <span className="endpoint__type">{p.type}</span>
                <span className="endpoint__desc">{p.description}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
