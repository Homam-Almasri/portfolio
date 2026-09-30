import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  { text: "$ curl -i https://homam-almasri.dev", cls: "cmd" },
  { text: "*  Resolving host … ok", cls: "dim" },
  { text: "*  TLS handshake · h2 · 12 ms", cls: "dim" },
  { text: "> GET / HTTP/2", cls: "req" },
  { text: "< HTTP/2 200 OK", cls: "ok" },
];

export default function Loader({ calm, onDone }: { calm: boolean; onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const step = calm ? 60 : 230;
    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), 150 + i * step));
    const end = window.setTimeout(() => setOpen(false), 150 + LINES.length * step + (calm ? 100 : 420));
    const skip = () => setOpen(false);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [calm]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="loader__term">
            {LINES.slice(0, shown).map((l) => (
              <motion.p
                key={l.text}
                className={`loader__line loader__line--${l.cls}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {l.text}
              </motion.p>
            ))}
            <span className="loader__caret" />
          </div>
          <div className="loader__bar">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: shown / LINES.length }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
