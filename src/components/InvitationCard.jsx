import { motion } from 'framer-motion'
import {
  MapPin,
  CalendarHeart,
  Clock,
  Heart,
  Sparkles,
} from 'lucide-react'
import CountdownTimer from './CountdownTimer'
import RunawayButton from './RunawayButton'
import SparkleEffect from './SparkleEffect'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function InvitationCard({ name, onAccept }) {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SparkleEffect count={5} />

      <motion.div
        className="relative w-full max-w-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card glow */}
        <div className="absolute -inset-4 bg-valentine-primary/10 rounded-[2.5rem] blur-2xl" />

        <motion.div
          className="relative glass-strong rounded-3xl overflow-hidden card-shadow"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {/* Top decorative strip */}
          <div className="h-2 bg-gradient-to-r from-valentine-primary via-valentine-secondary to-valentine-primary" />

          <div className="p-6 sm:p-8 md:p-10">
            {/* Envelope icon */}
            <motion.div variants={fadeInUp} className="text-center mb-6">
              <motion.div
                className="inline-block"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-5xl sm:text-6xl">💌</span>
              </motion.div>
            </motion.div>

            {/* Script heading */}
            <motion.h2
              variants={fadeInUp}
              className="font-script text-3xl sm:text-4xl md:text-5xl text-valentine-primary text-center mb-2"
            >
              My Dearest {name},
            </motion.h2>
 
            {/* Romantic letter */}
            <motion.div
              variants={fadeInUp}
              className="my-6 space-y-4 font-body text-valentine-dark/80 text-sm sm:text-base leading-relaxed text-justify"
            >
              <p>
                From the very first moment our eyes met, my heart knew something
                magical had begun. Every day with you feels like a beautiful
                dream I never want to wake up from.
              </p>
              <p>
                This Valentine's Day, I want to create a memory as special as
                you are. I've planned an evening filled with love, laughter, and
                everything that makes my heart sing because that's exactly
                what you do to me.
              </p>
              <p className="font-heading italic text-valentine-deep text-base sm:text-lg">
                "In a sea of people, my eyes will always search for you."
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 my-6"
            >
              <div className="flex-1 h-px bg-valentine-secondary/30" />
              <Heart className="w-4 h-4 text-valentine-primary fill-valentine-primary" />
              <div className="flex-1 h-px bg-valentine-secondary/30" />
            </motion.div>

            {/* Event details */}
            <motion.div variants={fadeInUp} className="space-y-4 mb-6">
              <h3 className="font-heading text-lg sm:text-xl text-valentine-dark font-semibold text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-valentine-gold" />
                Our Special Evening
                <Sparkles className="w-5 h-5 text-valentine-gold" />
              </h3>

              <div className="grid gap-3">
                <div className="flex items-center gap-3 glass rounded-xl p-3 sm:p-4">
                  <div className="w-10 h-10 rounded-full bg-valentine-primary/10 flex items-center justify-center flex-shrink-0">
                    <CalendarHeart className="w-5 h-5 text-valentine-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-valentine-dark text-sm">
                      February 14, 2026
                    </p>
                    <p className="font-body text-xs text-valentine-deep/50">
                      Valentine's Day
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 glass rounded-xl p-3 sm:p-4">
                  <div className="w-10 h-10 rounded-full bg-valentine-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-valentine-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-valentine-dark text-sm">
                      6:00 - 7:00 PM Onwards
                    </p>
                    <p className="font-body text-xs text-valentine-deep/50">
                      Dinner & Dancing under the stars
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 glass rounded-xl p-3 sm:p-4">
                  <div className="w-10 h-10 rounded-full bg-valentine-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-valentine-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-valentine-dark text-sm">
                      To Our Favorite Spot
                    </p>
                    <p className="font-body text-xs text-valentine-deep/50">
                      Maybe Reserved, just for us 😂
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div variants={fadeInUp}>
              <CountdownTimer />
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 my-6"
            >
              <div className="flex-1 h-px bg-valentine-secondary/30" />
              <span className="text-valentine-primary text-sm font-body">
                RSVP
              </span>
              <div className="flex-1 h-px bg-valentine-secondary/30" />
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
            >
              <motion.button
                onClick={onAccept}
                className="w-full sm:w-auto bg-gradient-to-r from-valentine-primary to-valentine-deep text-white font-body font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-lg shadow-valentine-primary/25 hover:shadow-xl hover:shadow-valentine-primary/35 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes, of course! 💖
              </motion.button>

              <RunawayButton className="w-full sm:w-auto bg-white/60 backdrop-blur-sm text-valentine-deep/70 font-body font-medium text-sm sm:text-base px-6 py-3 rounded-full border border-valentine-secondary/30 hover:border-valentine-secondary/50 transition-colors">
                Let me think…
              </RunawayButton>
            </motion.div>

            {/* Signature */}
            <motion.div
              variants={fadeInUp}
              className="text-center mt-8"
            >
              <p className="font-script text-2xl sm:text-3xl text-valentine-deep/40">
                With all my love
              </p>
              <p className="font-body text-xs text-valentine-deep/30 mt-2">
                Made with 💖 just for you
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
