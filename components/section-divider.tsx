"use client"

import { motion } from "framer-motion"

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-4 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex-1 h-px bg-border origin-right"
      />
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: "spring" }}
        className="mx-4 w-3 h-3 rounded-full bg-primary/30 border border-primary/50 shadow-skeuo"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex-1 h-px bg-border origin-left"
      />
    </div>
  )
}
