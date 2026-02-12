import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function createSparkle() {
  return {
    id: Math.random(),
    x: randomBetween(5, 95),
    y: randomBetween(5, 95),
    size: randomBetween(8, 20),
    duration: randomBetween(1, 2.5),
  }
}

export default function SparkleEffect({ count = 8 }) {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const filtered = prev.filter((s) => Date.now() - s.createdAt < 2500)
        if (filtered.length < count) {
          return [...filtered, { ...createSparkle(), createdAt: Date.now() }]
        }
        return filtered
      })
    }, 300)

    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              fontSize: `${sparkle.size}px`,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 180, 360] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: sparkle.duration, ease: 'easeInOut' }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
