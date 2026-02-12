import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  className = '',
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (!done) {
      setDone(true)
      onComplete?.()
    }
  }, [displayed, started, text, speed, done, onComplete])

  return (
    <span className={className}>
      {displayed}
      {started && !done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block ml-0.5 text-valentine-primary"
        >
          |
        </motion.span>
      )}
    </span>
  )
}
