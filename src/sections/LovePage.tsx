import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const verses = [
  {
    line1: "لعَيْنَيْكِ ما يَلقَى الفُؤادُ وَمَا لَقي",
    line2: "وللحُبّ ما لم يَبقَ منّي وما بَقي",
  },
  {
    line1: "ومَا كُنتُ مِمنْ يَدخلُ الِعشقَ قَلبهُ",
    line2: "ولَكِن مَنْ يُبصِر جُفونَكِ يَعْشَقِ",
  },
  {
    line1: "الحرفُ يبدأُ من عيْنَيْكِ رحْلتَهُ",
    line2: "كلُّ اللغاتِ بلا عينيكِ تَنْدثِرُ",
  },
];

function FallingHeart({ delay, left }: { delay: number; left: string }) {
  return (
    <motion.div
      className="falling-heart"
      style={{ left, position: "absolute", top: "-40px", fontSize: `${14 + Math.random() * 18}px` }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{ y: "110vh", opacity: [0, 1, 1, 0.5, 0], rotate: 360 }}
      transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: "linear" }}
    >
      {Math.random() > 0.5 ? "❤️" : "🌹"}
    </motion.div>
  );
}

export default function LovePage({ onBack }: { onBack: () => void }) {
  const [stage, setStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2500),
      setTimeout(() => setStage(3), 5000),
      setTimeout(() => setStage(4), 7500),
      setTimeout(() => setStage(5), 10000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleYes = useCallback(() => {
    setShowConfetti(true);
    setStage(6);
  }, []);

  const hearts = Array.from({ length: 20 }, (_, i) => (
    <FallingHeart key={i} delay={i * 0.5} left={`${Math.random() * 100}%`} />
  ));

  return (
    <div className="love-page" dir="rtl">
      {/* Falling hearts background */}
      <div className="love-page__hearts-bg">{hearts}</div>

      {/* Back button (tiny, top-left) */}
      <button className="love-page__back" onClick={onBack}>←</button>

      {/* Stage 0: Her name reveal */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            className="love-page__name-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.p
              className="love-page__prefix"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              إلى من سكنت القلب
            </motion.p>
            <motion.h1
              className="love-page__her-name"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            >
              تسنيم
            </motion.h1>
            <motion.div
              className="love-page__name-line"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1.2, delay: 1.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2-4: Poetry verses */}
      {verses.map((verse, i) => (
        <AnimatePresence key={i}>
          {stage >= i + 2 && (
            <motion.div
              className="love-page__verse"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <p className="love-page__verse-line">{verse.line1}</p>
              <motion.p
                className="love-page__verse-line love-page__verse-line--2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {verse.line2}
              </motion.p>
              <div className="love-page__verse-ornament">✦</div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Stage 5: The Proposal */}
      <AnimatePresence>
        {stage >= 5 && !showConfetti && (
          <motion.div
            className="love-page__proposal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <motion.div
              className="love-page__ring"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            >
              💍
            </motion.div>
            <motion.h2
              className="love-page__proposal-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              تسنيم...
            </motion.h2>
            <motion.p
              className="love-page__proposal-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              ما عاد قلبي يكفيه الشعر ولا الكلام...
              <br />
              أريدكِ شريكة عمري وأيامي
              <br />
              <strong>أطلب يدكِ... فهل تقبلين؟</strong>
            </motion.p>
            <motion.button
              className="love-page__yes-btn"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={handleYes}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              نعم، أقبل 💍
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 6: She said YES! */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="love-page__celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ConfettiExplosion />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="love-page__celebration-ring">💍</div>
              <h2 className="love-page__celebration-title">الحمد لله ❤️</h2>
              <p className="love-page__celebration-text">
                اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
              </p>
              <p className="love-page__celebration-names">
                همام ♥ تسنيم
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfettiExplosion() {
  const confetti = Array.from({ length: 40 }, (_, i) => {
    const emojis = ["❤️", "💍", "🌹", "✨", "💖", "🎉", "💐", "🩷"];
    return (
      <motion.span
        key={i}
        className="confetti-piece"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          fontSize: `${12 + Math.random() * 20}px`,
        }}
        initial={{ x: 0, y: 0, opacity: 1 }}
        animate={{
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 800,
          opacity: [1, 1, 0],
          rotate: Math.random() * 720,
        }}
        transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
      >
        {emojis[i % emojis.length]}
      </motion.span>
    );
  });
  return <div className="confetti-container">{confetti}</div>;
}
