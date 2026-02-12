import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function RunawayButton({ children, className = '' }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [escapeCount, setEscapeCount] = useState(0)
  const buttonRef = useRef(null)

  const messages = [
    'Let me think…',
    'Wait, come back!',
    'Hey! 😳',
    "Can't catch me!",
    'Just say YES! 💕',
    'Pretty please? 🥺',
    "You know you want to! ❤️",
    'Stop being silly! 😘',
  ]

  const handleInteraction = useCallback(() => {
    const maxOffset = 150
    const newX = (Math.random() - 0.5) * maxOffset * 2
    const newY = (Math.random() - 0.5) * maxOffset * 2

    setOffset({ x: newX, y: newY })
    setEscapeCount((c) => c + 1)
  }, [])

  return (
    <motion.button
      ref={buttonRef}
      className={`${className} no-select`}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      whileTap={{ scale: 0.9 }}
    >
      {escapeCount > 0 ? messages[Math.min(escapeCount, messages.length) - 1] : children}
    </motion.button>
  )
}
