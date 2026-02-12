import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const HEART_EMOJIS = ['💖', '💕', '💗', '💘', '💝', '🌹', '✨', '💞']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function createHeart(id) {
  return {
    id,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    x: randomBetween(0, 100),
    size: randomBetween(14, 32),
    duration: randomBetween(8, 16),
    delay: randomBetween(0, 8),
    opacity: randomBetween(0.15, 0.5),
    swayAmount: randomBetween(-60, 60),
  }
}

export default function FloatingHearts({ count = 20 }) {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    setHearts(Array.from({ length: count }, (_, i) => createHeart(i)))
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute no-select"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            bottom: '-40px',
          }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 100 : 1000)],
            x: [0, heart.swayAmount, 0, -heart.swayAmount, 0],
            rotate: [0, 15, -15, 10, 0],
            opacity: [0, heart.opacity, heart.opacity, heart.opacity * 0.5, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  )
}
