"use client"

import { motion } from "framer-motion"
import { Github, Mail, Globe, Clock, Download, User } from "lucide-react"
import Image from "next/image"

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/AYOPELUMI" },
  { icon: Mail, label: "Email", href: "mailto:ayopelumi2014@gmail.com" },
  { icon: Globe, label: "Portfolio", href: "https://ayopelumi.vercel.app" },
  { icon: Clock, label: "WakaTime", href: "https://wakatime.com/@ayopelumi2014" },
]

export function HeroSection() {
  // Function to handle resume download
  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const resumeUrl = "/resume.pdf"
    const link = document.createElement("a")
    link.href = resumeUrl
    link.download = "Ogundeji_Ayodeji_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-44 pb-16">
      {/* Animated background - desk texture */}
      <div className="absolute inset-0 bg-background texture-wood" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] w-16 h-16 rounded-lg bg-leather/30 shadow-skeuo rotate-12 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-[10%] w-12 h-12 rounded-full bg-gold/10 shadow-skeuo hidden lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
        {/* Leather portfolio card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-card rounded-2xl p-8 md:p-12 texture-leather shadow-skeuo-deep border border-border"
        >
          {/* Stitching border */}
          <div className="absolute inset-4 border border-dashed border-gold/20 rounded-xl pointer-events-none" />



          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-4 gold-emboss text-balance"
          >
            Ogundeji{" "}
            <span className="text-primary">Ayodeji</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-8"
          >
            <div className="inline-block bg-card/80 texture-leather rounded-xl px-6 py-3 shadow-skeuo border border-border">
              <p className="font-mono text-sm md:text-base text-muted-foreground tracking-wide">
                Front-End Web & Mobile Developer
              </p>
              <p className="font-mono text-xs text-muted-foreground/70 mt-1">
                Flutter • React • Next.js • TypeScript
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-mono text-sm md:text-base text-pretty"
          >
            I build scalable, user-focused digital products across Flutter and JavaScript ecosystems.
            Pixel-perfect interfaces, clean architecture, and modern development practices are my forte.
          </motion.p>

          {/* Action Buttons - Social Links + Download Resume */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {/* Download Resume Button */}
            <motion.button
              onClick={handleDownloadResume}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary texture-metal shadow-skeuo text-white hover:bg-primary/90 border border-primary/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="font-mono text-xs font-medium">Download Resume</span>
            </motion.button>

            {/* Social Links */}
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + (i + 1) * 0.1, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary texture-metal shadow-skeuo text-muted-foreground hover:text-primary hover:border-primary/30 border border-border transition-colors"
              >
                <link.icon className="w-4 h-4" />
                <span className="font-mono text-xs">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - compass needle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <motion.a
            href="#experience"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="font-mono text-xs tracking-widest uppercase">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}