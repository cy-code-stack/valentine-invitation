import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-react'

function fireConfetti() {
  const duration = 4000
  const end = Date.now() + duration

  const heartColors = ['#ff4d6d', '#ff8fab', '#ffccd5', '#c9184a', '#ff69b4']

  // Initial burst
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: heartColors,
    shapes: ['circle'],
    scalar: 1.2,
  })

  // Continuous side cannons
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval)
      return
    }

    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: heartColors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: heartColors,
    })
  }, 150)
}

const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  emoji: ['💖', '💕', '💗', '💘', '❤️', '💝'][i % 6],
  x: Math.random() * 100,
  delay: Math.random() * 2,
  size: 20 + Math.random() * 24,
}))

export default function Celebration({ name }) {
  useEffect(() => {
    fireConfetti()
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-valentine-primary/20 to-valentine-blush/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Floating hearts */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{ left: `${h.x}%`, fontSize: `${h.size}px`, bottom: '-10%' }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight * 1.3 : 1200)],
            x: [0, (Math.random() - 0.5) * 80],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {h.emoji}
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        className="relative glass-strong rounded-3xl p-8 sm:p-12 max-w-md w-full text-center card-shadow"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
      >
        {/* Big heart */}
        <motion.div
          className="mx-auto mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-valentine-primary fill-valentine-primary mx-auto heart-shadow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-script text-4xl sm:text-5xl text-valentine-primary mb-4">
            Yay!
          </h2>
          <p className="font-heading text-xl sm:text-2xl text-valentine-dark font-semibold mb-3">
            You made my heart skip a beat, {name}!
          </p>
          <p className="font-body text-valentine-deep/70 mb-6 leading-relaxed">
            I'll be counting every second until I see you. This is going to be
            the most magical Valentine's Day ever!
          </p>

          <div className="flex items-center justify-center gap-2 text-valentine-primary">
            <Sparkles className="w-5 h-5" />
            <span className="font-body text-sm uppercase tracking-widest">
              See you on February 14th
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>

        <motion.p
          className="mt-6 font-script text-2xl text-valentine-deep/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Forever yours 💕
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
