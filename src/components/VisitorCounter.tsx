import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VisitorCounterProps {
  goatcounterCode: string;
}

export default function VisitorCounter({ goatcounterCode }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Try multiple path formats since GoatCounter may record with or without trailing slash
    const paths = ["%2Fportfolio", "%2Fportfolio%2F", "portfolio"];
    
    const tryFetch = async () => {
      for (const p of paths) {
        try {
          const r = await fetch(`https://${goatcounterCode}.goatcounter.com/counter/${p}.json`);
          if (r.ok) {
            const data = await r.json();
            if (data && data.count) {
              const num = parseInt(data.count.replace(/[^\d]/g, ""), 10);
              if (num > 0) {
                setCount(num);
                return;
              }
            }
          }
        } catch (_) { /* try next */ }
      }
    };

    tryFetch();
  }, [goatcounterCode]);

  if (count === null) return null;

  return (
    <motion.div
      className="visitor-counter"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <span className="visitor-counter__icon">👁️</span>
      <span className="visitor-counter__count">{count.toLocaleString()}</span>
      <span className="visitor-counter__label">visitors</span>
    </motion.div>
  );
}
