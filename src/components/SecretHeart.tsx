import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SecretHeartProps {
  onUnlock: () => void;
}

export default function SecretHeart({ onUnlock }: SecretHeartProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = () => {
    const valid = ["تسنيم", "tasneem", "Tasneem", "TASNEEM"];
    if (valid.includes(name.trim())) {
      setError(false);
      setShowModal(false);
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <button
        className="secret-heart"
        onClick={() => setShowModal(true)}
        title=""
        aria-label="secret"
      >
        🩶
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="heart-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={`heart-modal ${shaking ? "shake" : ""}`}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="heart-modal__icon">💝</div>
              <h3 className="heart-modal__title">مفتاح القلب</h3>
              <p className="heart-modal__subtitle">
                ما اسم مالكة قلب هذا الإنسان؟
              </p>
              <input
                className={`heart-modal__input ${error ? "heart-modal__input--error" : ""}`}
                type="text"
                placeholder="...اكتبي الاسم"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(false); }}
                onKeyDown={handleKeyDown}
                autoFocus
                dir="auto"
              />
              {error && (
                <motion.p
                  className="heart-modal__error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  هذا ليس الاسم الصحيح... حاولي مجدداً 💔
                </motion.p>
              )}
              <button className="heart-modal__btn" onClick={handleSubmit}>
                افتحي القلب 💍
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
