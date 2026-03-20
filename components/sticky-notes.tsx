"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Plus, X, Pin } from "lucide-react"

type Note = {
  id: string
  text: string
  color: "yellow" | "pink" | "blue" | "green"
  rotation: number
  x: number
  y: number
}

const colorMap = {
  yellow: "bg-note-yellow",
  pink: "bg-note-pink",
  blue: "bg-note-blue",
  green: "bg-note-green",
}

const colorTextMap = {
  yellow: "text-paper-foreground",
  pink: "text-paper-foreground",
  blue: "text-paper-foreground",
  green: "text-paper-foreground",
}

const defaultNotes: Note[] = [
  { id: "1", text: "Welcome to my portfolio! Feel free to leave a note.", color: "yellow", rotation: -3, x: 0, y: 0 },
  { id: "2", text: "Currently exploring AI integrations with Flutter apps!", color: "pink", rotation: 2, x: 0, y: 0 },
  { id: "3", text: "Open to freelance and collaboration opportunities.", color: "blue", rotation: -1, x: 0, y: 0 },
  { id: "4", text: "Building cool stuff at the intersection of web and mobile.", color: "green", rotation: 4, x: 0, y: 0 },
]

function StickyNote({ note, onDelete }: { note: Note; onDelete: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, rotate: note.rotation - 20 }}
      animate={{ scale: 1, rotate: note.rotation }}
      exit={{ scale: 0, rotate: note.rotation + 30, opacity: 0 }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
        transition: { type: "spring", stiffness: 300 }
      }}
      drag
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`relative ${colorMap[note.color]} ${colorTextMap[note.color]} rounded-sm p-5 pt-8 shadow-note cursor-move active:cursor-move min-h-[140px] w-full`}
      style={{ rotate: `${note.rotation}deg` }}
    >
      {/* Pin */}
      <motion.div
        whileHover={{ scale: 1.3, rotate: 15 }}
        className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 "
      >
        <div className="w-5 h-5 rounded-full bg-metal shadow-skeuo flex items-center justify-center border border-metal-light">
          <Pin className="w-2.5 h-2.5 text-foreground" />
        </div>
      </motion.div>

      {/* Tape effect */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-4 bg-foreground/5 rounded-sm" />

      {/* Delete button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(note.id)
        }}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-paper-foreground/10 flex items-center justify-center hover:bg-paper-foreground/20 transition-colors"
        aria-label="Delete note"
      >
        <X className="w-3 h-3" />
      </motion.button>

      {/* Note text */}
      <p className="text-sm leading-relaxed font-mono ">{note.text}</p>

      {/* Paper fold effect */}
      <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-background/10 rotate-45 translate-x-2 translate-y-2" />
      </div>
    </motion.div>
  )
}

export function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes)
  const [newNoteText, setNewNoteText] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  const colors: Note["color"][] = ["yellow", "pink", "blue", "green"]

  const addNote = () => {
    if (!newNoteText.trim()) return
    const note: Note = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 8 - 4,
      x: 0,
      y: 0,
    }
    setNotes([...notes, note])
    setNewNoteText("")
    setIsAdding(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <section id="notes" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background texture-wood opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card texture-metal rounded-xl px-8 py-4 shadow-skeuo-deep border border-border mb-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground gold-emboss">
              Note Board
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-lg mx-auto">
            Disposable thoughts, ideas, and messages. Pin a note or toss one away.
          </p>
        </motion.div>

        {/* Cork board */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative bg-leather-light/30 rounded-2xl p-6 md:p-8 shadow-skeuo-deep border-4 border-leather/50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(139,90,43,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139,90,43,0.08) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,90,43,0.02) 10px, rgba(139,90,43,0.02) 20px)
            `
          }}
        >
          {/* Board frame corners */}
          <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-metal shadow-skeuo" />
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-metal shadow-skeuo" />
          <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-metal shadow-skeuo" />
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-metal shadow-skeuo" />

          {/* Notes grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {notes.map((note) => (
                <StickyNote key={note.id} note={note} onDelete={deleteNote} />
              ))}
            </AnimatePresence>

            {/* Add note button / form */}
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="form"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-note-yellow rounded-sm p-5 shadow-note min-h-[140px] flex flex-col"
                >
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Write your note..."
                    className="flex-1 bg-transparent border-none outline-none resize-none font-mono text-sm text-paper-foreground placeholder:text-paper-foreground/50"
                    autoFocus
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={addNote}
                      className="px-3 py-1 rounded-md bg-paper-foreground/20 text-paper-foreground font-mono text-xs hover:bg-paper-foreground/30 transition-colors"
                    >
                      Pin it
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { setIsAdding(false); setNewNoteText("") }}
                      className="px-3 py-1 rounded-md text-paper-foreground/60 font-mono text-xs hover:text-paper-foreground transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="button"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAdding(true)}
                  className="min-h-[140px] rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors bg-card/20"
                >
                  <Plus className="w-8 h-8" />
                  <span className="font-mono text-xs">Add Note</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
