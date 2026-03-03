"use client"

import { motion } from "framer-motion"
import { Github, Mail, Globe, Heart } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/AYOPELUMI", label: "GitHub" },
  { icon: Mail, href: "mailto:ayopelumi2014@gmail.com", label: "Email" },
  { icon: Globe, href: "https://ayopelumi.vercel.app", label: "Portfolio" },
]

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="absolute inset-0 bg-card/50 texture-leather" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-leather texture-leather shadow-skeuo flex items-center justify-center border border-gold/30">
              <span className="text-gold font-serif text-lg font-bold gold-emboss">A</span>
            </div>
            <div>
              <p className="font-serif text-foreground font-bold">Ogundeji Ayodeji</p>
              <p className="font-mono text-xs text-muted-foreground">Web & Mobile Developer</p>
            </div>
          </motion.div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-secondary texture-metal shadow-skeuo flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 border border-border transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-muted-foreground flex items-center justify-center gap-1.5"
        >
          <span>Crafted with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-3 h-3 text-accent fill-accent" />
          </motion.span>
          <span>by Ayodeji. All rights reserved 2025.</span>
        </motion.p>
      </div>
    </footer>
  )
}
