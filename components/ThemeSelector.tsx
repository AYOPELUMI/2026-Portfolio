"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette } from "lucide-react"

const themes = [
    { id: "theme-steel", label: "Cold Steel", color: "hsl(210, 8%, 12%)" },
    { id: "theme-paper", label: "Warm Paper", color: "hsl(35, 25%, 90%)" },
    { id: "theme-obsidian", label: "Deep Obsidian", color: "hsl(220, 12%, 8%)" },
]

export function ThemeSelector() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTheme, setActiveTheme] = useState("theme-steel")

    const applyTheme = (themeId: string) => {
        document.documentElement.classList.remove("theme-steel", "theme-paper", "theme-obsidian")
        if (themeId) document.documentElement.classList.add(themeId)
        setActiveTheme(themeId)
        setIsOpen(false)
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 100 }}
            className="fixed bottom-4 left-4 z-40"
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="mb-3 bg-card rounded-xl p-3 shadow-skeuo-deep border border-border texture-leather"
                    >
                        <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 px-1">Material</p>
                        <div className="flex flex-col gap-1.5">
                            {themes.map((theme) => (
                                <motion.button
                                    key={theme.id}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => applyTheme(theme.id)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTheme === theme.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                        }`}
                                >
                                    <div className="w-4 h-4 rounded-full border border-border shadow-skeuo" style={{ backgroundColor: theme.color }} />
                                    <span className="font-mono text-xs">{theme.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-card texture-metal shadow-skeuo-deep border border-border flex items-center justify-center"
                aria-label="Change theme"
            >
                <Palette className="w-5 h-5 text-primary" />
            </motion.button>
        </motion.div>
    )
}
