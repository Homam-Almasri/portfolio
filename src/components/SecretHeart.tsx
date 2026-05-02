import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SecretHeartProps {
  onUnlock: () => void;
}

export default function SecretHeart({ onUnlock }: SecretHeartProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = () => {
    const valid = ["تسنيم", "تسنيم زينو", "tasneem", "Tasneem", "TASNEEM", "tasneem zaino", "Tasneem Zaino", "Tasneem zaino"];
    if (valid.includes(name.trim())) {
      setError(false);
      setUnlocked(true);
      // Track secret page unlock in GoatCounter
      const gc = (window as any).goatcounter;
      if (gc && gc.count) {
        gc.count({ path: "/secret-love-page", title: "Secret Love Page Unlocked", event: true });
      }
      setTimeout(() => {
        setShowModal(false);
        setUnlocked(false);
        onUnlock();
      }, 2500);
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
        <span className="secret-heart__icon">♥</span>
        <span className="secret-heart__label">↙</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="heart-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!unlocked) setShowModal(false); }}
          >
            <motion.div
              className={`heart-modal ${shaking ? "shake" : ""}`}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
            >
              {!unlocked ? (
                <>
                  <div className="heart-modal__icon">👋</div>
                  <h3 className="heart-modal__title">مرحباً</h3>
                  <p className="heart-modal__subtitle">أدخل اسمك فقط</p>
                  <input
                    className={`heart-modal__input ${error ? "heart-modal__input--error" : ""}`}
                    type="text"
                    placeholder="الاسم..."
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(false); }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    dir="auto"
                  />
                  {error && (
                    <motion.p
                      className="heart-modal__error-normal"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      أهلاً {name}! لا يوجد شيء هنا 😊
                    </motion.p>
                  )}
                  <button className="heart-modal__btn" onClick={handleSubmit}>
                    تأكيد
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  className="heart-modal__welcome"
                >
                  <div className="heart-modal__icon">💝</div>
                  <h3 className="heart-modal__title">أهلاً تسنيم</h3>
                  <p className="heart-modal__subtitle">مالكة قلب هذا الإنسان ❤️</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
