"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Tech", href: "#tech" },
  { label: "Notes", href: "#notes" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-skeuo border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo - leather badge */}
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-leather texture-leather shadow-skeuo flex items-center justify-center border border-gold/30">
            <span className="text-gold font-serif text-lg font-bold gold-emboss">A</span>
          </div>
          <span className="text-foreground font-serif text-lg tracking-wide hidden sm:block">
            Ayodeji
          </span>
        </motion.a>

        {/* Desktop nav - metal tabs */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-xl p-1 texture-metal shadow-skeuo-pressed">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className={`relative px-4 py-2 rounded-lg text-sm font-mono tracking-wide transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg shadow-skeuo"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-lg bg-secondary shadow-skeuo flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-foreground rounded"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-foreground rounded"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-foreground rounded"
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card/98 backdrop-blur-md border-b border-border"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground font-mono text-sm bg-secondary/50 shadow-skeuo-pressed hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
