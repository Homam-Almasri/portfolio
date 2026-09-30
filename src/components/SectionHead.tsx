import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SectionHead({ num, route, title, sub }: { num: string; route: string; title: ReactNode; sub?: string }) {
  return (
    <div className="shead">
      <motion.p
        className="shead__route"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="shead__num">{num}</span>
        <span className="shead__line" />
        <span>{route}</span>
      </motion.p>
      {/* observe the mask, not the title: the title starts clipped by it, so it never counts as in view */}
      <motion.div className="shead__mask" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.5 }}>
        <motion.h2
          className="shead__title"
          variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
          transition={{ duration: 1, ease: EASE, delay: 0.08 }}
        >
          {title}
        </motion.h2>
      </motion.div>
      {sub && (
        <motion.p
          className="shead__sub"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
