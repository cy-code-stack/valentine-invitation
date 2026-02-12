import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

function getTimeLeft() {
  const now = new Date()
  const year = now.getFullYear()
  // Target: Feb 14 of the current year (or next year if already past)
  let valentine = new Date(year, 1, 14, 19, 0, 0) // Feb 14 at 7:00 PM
  if (now > valentine) {
    valentine = new Date(year + 1, 1, 14, 19, 0, 0)
  }

  const diff = valentine - now
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isToday: false,
  }
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center card-shadow"
      >
        <span className="font-heading text-2xl sm:text-3xl font-bold text-valentine-deep">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="font-body text-xs sm:text-sm text-valentine-deep/60 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (time.isToday) {
    return (
      <motion.div
        className="text-center py-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-script text-3xl sm:text-4xl text-valentine-primary">
          Tonight is the night! 💖
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="text-center py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-valentine-primary" />
        <p className="font-body text-sm sm:text-base text-valentine-deep/60 uppercase tracking-widest">
          Counting down to our evening
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <TimeUnit value={time.days} label="Days" />
        <span className="font-heading text-2xl text-valentine-primary mt-[-20px]">:</span>
        <TimeUnit value={time.hours} label="Hours" />
        <span className="font-heading text-2xl text-valentine-primary mt-[-20px]">:</span>
        <TimeUnit value={time.minutes} label="Min" />
        <span className="font-heading text-2xl text-valentine-primary mt-[-20px]">:</span>
        <TimeUnit value={time.seconds} label="Sec" />
      </div>
    </motion.div>
  )
}
