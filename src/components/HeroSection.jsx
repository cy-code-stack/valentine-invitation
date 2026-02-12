import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import TypewriterText from './TypewriterText'
import SparkleEffect from './SparkleEffect'

export default function HeroSection({ name, onOpenHeart }) {
  const [typingDone, setTypingDone] = useState(false)

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <SparkleEffect count={6} />

      {/* Decorative top flourish */}
      <motion.div
        className="text-valentine-secondary text-4xl md:text-5xl mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        💌
      </motion.div>

      {/* Main headline */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-valentine-dark leading-tight mb-4">
          <TypewriterText
            text={`Will you be my Valentine, ${name}?`}
            speed={55}
            delay={800}
            onComplete={() => setTypingDone(true)}
          />
        </h1>

        <motion.p
          className="font-body text-lg sm:text-xl md:text-2xl text-valentine-deep/70 mt-6 font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: typingDone ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          Every love story is beautiful, but ours is my favorite...
        </motion.p>
      </motion.div>

      {/* Heart button */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: typingDone ? 1 : 0, scale: typingDone ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.button
          onClick={onOpenHeart}
          className="group relative no-select"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glowing ring behind button */}
          <motion.div
            className="absolute inset-0 rounded-full bg-valentine-primary/20 blur-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative flex items-center gap-3 bg-gradient-to-r from-valentine-primary to-valentine-deep text-white font-body font-semibold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-lg shadow-valentine-primary/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-valentine-primary/40">
            <span>Open My Heart</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 fill-white" />
            </motion.span>
            <span className="text-2xl">💖</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: typingDone ? 0.6 : 0, y: [0, 8, 0] }}
        transition={{ y: { duration: 2, repeat: Infinity }, opacity: { duration: 0.5 } }}
      >
        <p className="font-body text-sm text-valentine-deep/50">
          Tap to reveal your surprise
        </p>
      </motion.div>
    </motion.section>
  )
}
