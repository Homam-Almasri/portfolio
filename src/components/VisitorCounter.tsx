import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VisitorCounterProps {
  goatcounterCode: string;
}

export default function VisitorCounter({ goatcounterCode }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch total page views from GoatCounter public API
    fetch(`https://${goatcounterCode}.goatcounter.com/counter//portfolio/.json`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.count) {
          const num = parseInt(data.count.replace(/\s/g, ""), 10);
          setCount(num);
        }
      })
      .catch(() => {
        // Fallback: just show nothing if API fails
        setCount(null);
      });
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
