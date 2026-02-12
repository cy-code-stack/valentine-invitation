import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const audioRef = useRef(null)

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}music/backgroud.mp3`)
    audio.loop = true
    audio.volume = 0.5
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Auto-start on first user interaction (browsers require a gesture)
  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current
      if (!audio || started) return

      audio.play().then(() => {
        setStarted(true)
      }).catch(() => {
        // Retry on next interaction if blocked
      })
    }

    const events = ['click', 'touchstart', 'keydown']
    events.forEach((e) => document.addEventListener(e, handler, { capture: true }))

    return () => {
      events.forEach((e) => document.removeEventListener(e, handler, true))
    }
  }, [started])

  // Mute / unmute
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = muted
  }, [muted])

  return (
    <motion.button
      onClick={() => setMuted((m) => !m)}
      className="fixed top-4 right-4 z-40 glass-strong rounded-full w-12 h-12 flex items-center justify-center card-shadow no-select"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      title={muted ? 'Unmute music' : 'Mute music'}
    >
      {muted ? (
        <VolumeX className="w-5 h-5 text-valentine-deep/50" />
      ) : (
        <Music className="w-5 h-5 text-valentine-primary" />
      )}
      {!muted && started && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-valentine-primary/30"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}
