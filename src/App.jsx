import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { formatName, updatePageMeta } from './utils/formatName'
import FloatingHearts from './components/FloatingHearts'
import HeroSection from './components/HeroSection'
import InvitationCard from './components/InvitationCard'
import Celebration from './components/Celebration'
import MusicToggle from './components/MusicToggle'

export default function App() {
  const { name: rawName } = useParams()
  const name = formatName(rawName)

  const [stage, setStage] = useState('hero')

  useEffect(() => {
    updatePageMeta(name)
  }, [name])

  const handleOpenHeart = useCallback(() => {
    setStage('invitation')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleAccept = useCallback(() => {
    setStage('celebration')
  }, [])

  return (
    <div className="relative min-h-screen bg-romantic-soft overflow-x-hidden">
      {/* Ambient background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-valentine-blush/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-valentine-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-valentine-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating hearts background */}
      <FloatingHearts count={stage === 'celebration' ? 30 : 18} />

      {/* Music toggle */}
      <MusicToggle />

      {/* Main content transitions */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === 'hero' && (
            <HeroSection
              key="hero"
              name={name}
              onOpenHeart={handleOpenHeart}
            />
          )}

          {stage === 'invitation' && (
            <InvitationCard
              key="invitation"
              name={name}
              onAccept={handleAccept}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {stage === 'celebration' && (
          <Celebration key="celebration" name={name} />
        )}
      </AnimatePresence>
    </div>
  )
}
