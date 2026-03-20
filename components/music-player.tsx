"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ChevronUp, ChevronDown, List } from "lucide-react"

type Track = {
  id: number
  title: string
  artist: string
  duration: string
  // Using generated tones via Web Audio API
  frequency: number
  color: string
}

const playlist: Track[] = [
  { id: 1, title: "Deep Focus", artist: "Lo-Fi Beats", duration: "3:24", frequency: 262, color: "from-primary/30 to-accent/20" },
  { id: 2, title: "Code Flow", artist: "Ambient Works", duration: "4:12", frequency: 330, color: "from-accent/30 to-primary/20" },
  { id: 3, title: "Night Commit", artist: "Synth Waves", duration: "2:58", frequency: 392, color: "from-gold/30 to-leather-light/20" },
  { id: 4, title: "Build & Deploy", artist: "Electronic Chill", duration: "3:45", frequency: 440, color: "from-primary/20 to-gold/30" },
  { id: 5, title: "Pixel Perfect", artist: "Lo-Fi Beats", duration: "3:10", frequency: 523, color: "from-accent/20 to-primary/30" },
  { id: 6, title: "Debug Mode", artist: "Ambient Works", duration: "4:33", frequency: 349, color: "from-gold/20 to-accent/30" },
]

export function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const track = playlist[currentTrack]

  const stopAudio = useCallback(() => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
      } catch { }
      oscillatorRef.current = null
    }
  }, [])

  const startAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current

    stopAudio()

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filterNode = ctx.createBiquadFilter()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(track.frequency, ctx.currentTime)

    filterNode.type = "lowpass"
    filterNode.frequency.setValueAtTime(800, ctx.currentTime)
    filterNode.Q.setValueAtTime(1, ctx.currentTime)

    gainNode.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime)

    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start()
    oscillatorRef.current = oscillator
    gainNodeRef.current = gainNode
  }, [track.frequency, volume, isMuted, stopAudio])

  useEffect(() => {
    if (isPlaying) {
      startAudio()
      progressIntervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            nextTrack()
            return 0
          }
          return p + 0.5
        })
      }, 150)
    } else {
      stopAudio()
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
    return () => {
      stopAudio()
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrack])

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, audioContextRef.current?.currentTime ?? 0)
    }
  }, [volume, isMuted])

  const togglePlay = () => setIsPlaying(!isPlaying)

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setProgress(0)
  }

  return (
    <motion.div
      drag
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 100 }}
      className="fixed bottom-4 right-4 z-40 cursor-move"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-3 w-72 bg-card rounded-2xl overflow-hidden shadow-skeuo-deep border border-border texture-leather"
          >
            {/* Album art area */}
            <div className={`relative h-32 bg-gradient-to-br ${track.color} flex items-center justify-center overflow-hidden`}>
              {/* Animated background circles */}
              <motion.div
                animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-40 h-40 rounded-full border border-foreground/10"
              />
              <motion.div
                animate={isPlaying ? { scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-28 h-28 rounded-full border border-foreground/10"
              />

              {/* Vinyl record */}
              <div className="relative z-10">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
                  className="w-20 h-20 rounded-full bg-card shadow-skeuo-deep flex items-center justify-center"
                >
                  {/* Vinyl grooves */}
                  <div className="absolute w-18 h-18 rounded-full border border-foreground/5" style={{ width: "72px", height: "72px" }} />
                  <div className="absolute w-14 h-14 rounded-full border border-foreground/5" style={{ width: "56px", height: "56px" }} />
                  <div className="absolute w-10 h-10 rounded-full border border-foreground/5" style={{ width: "40px", height: "40px" }} />
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Track info */}
            <div className="px-4 pt-3 pb-1">
              <motion.h4
                key={track.title}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="font-serif text-sm font-bold text-foreground truncate"
              >
                {track.title}
              </motion.h4>
              <p className="font-mono text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>

            {/* Progress bar */}
            <div className="px-4 py-2">
              <div className="w-full h-1.5 rounded-full bg-secondary shadow-skeuo-pressed overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-4 pb-3">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-full bg-secondary texture-metal shadow-skeuo flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </motion.button>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={prevTrack}
                  className="w-8 h-8 rounded-full bg-secondary texture-metal shadow-skeuo flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-primary shadow-skeuo-deep flex items-center justify-center text-primary-foreground"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={nextTrack}
                  className="w-8 h-8 rounded-full bg-secondary texture-metal shadow-skeuo flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="w-8 h-8 rounded-full bg-secondary texture-metal shadow-skeuo flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Show playlist"
              >
                <List className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Volume slider */}
            <div className="px-4 pb-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                aria-label="Volume"
              />
            </div>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="max-h-48 overflow-y-auto">
                    {playlist.map((t, i) => (
                      <motion.button
                        key={t.id}
                        whileHover={{ x: 4 }}
                        onClick={() => { setCurrentTrack(i); setProgress(0) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === currentTrack
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono ${i === currentTrack ? "bg-primary text-primary-foreground" : "bg-secondary"
                          }`}>
                          {i === currentTrack && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-0.5 bg-current rounded" />
                              <motion.div animate={{ height: ["100%", "40%", "100%"] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-0.5 bg-current rounded" />
                              <motion.div animate={{ height: ["60%", "100%", "60%"] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-0.5 bg-current rounded" />
                            </div>
                          ) : (
                            <span>{i + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif truncate">{t.title}</p>
                          <p className="text-[10px] font-mono opacity-60">{t.artist}</p>
                        </div>
                        <span className="text-[10px] font-mono opacity-40">{t.duration}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini player toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-14 h-14 rounded-full bg-card texture-metal shadow-skeuo-deep border border-border flex items-center justify-center"
        aria-label="Toggle music player"
      >
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
          />
        )}
        <Music className="w-5 h-5 text-primary" />
        {isExpanded ? (
          <ChevronDown className="absolute -top-1 -right-1 w-4 h-4 text-muted-foreground bg-card rounded-full" />
        ) : (
          <ChevronUp className="absolute -top-1 -right-1 w-4 h-4 text-muted-foreground bg-card rounded-full" />
        )}
      </motion.button>
    </motion.div>
  )
}
