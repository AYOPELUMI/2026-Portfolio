"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const webTech = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "TailwindCSS", "SASS", "Git", "Firebase", "Supabase", "GraphQL",
  "Node.js", "Express.js", "Postman", "Google Maps API",
]

const mobileTech = [
  "Flutter", "Dart", "Riverpod", "Provider", "Bloc", "GetX",
  "Hive", "Dio", "Firebase", "GraphQL", "Google Places",
]

const strengths = [
  "Communication", "Problem Solving", "Collaboration", "Quick Learner", "Pixel-Perfect UI",
]

function TechChip({ label, index, category }: { label: string; index: number; category: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, rotate: -10 }}
      animate={isInView ? { scale: 1, rotate: 0 } : {}}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      <motion.div
        whileHover={{ y: -3, scale: 1.08, rotate: [-1, 1, 0] }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-lg bg-card texture-leather shadow-skeuo border border-border cursor-default hover:border-primary/40 transition-colors"
      >
        <span className="font-mono text-sm text-foreground">{label}</span>
      </motion.div>
    </motion.div>
  )
}

function SkillMeter({ label, level, index }: { label: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ x: -30, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-xs text-muted-foreground w-28 text-right">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-secondary shadow-skeuo-pressed overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-primary relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer" />
        </motion.div>
      </div>
      <span className="font-mono text-xs text-primary w-10">{level}%</span>
    </motion.div>
  )
}

export function TechStack() {
  return (
    <section id="tech" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background texture-wood opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-card texture-metal rounded-xl px-8 py-4 shadow-skeuo-deep border border-border mb-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground gold-emboss">
              Tech Arsenal
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Web technologies */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-xl p-6 texture-leather shadow-skeuo border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                <h3 className="font-serif text-xl font-bold text-foreground">Web Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {webTech.map((tech, i) => (
                  <TechChip key={tech} label={tech} index={i} category="web" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mobile technologies */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-xl p-6 texture-leather shadow-skeuo border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
                <h3 className="font-serif text-xl font-bold text-foreground">Mobile Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mobileTech.map((tech, i) => (
                  <TechChip key={tech} label={tech} index={i} category="mobile" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Proficiency meters */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-card rounded-xl p-6 texture-leather shadow-skeuo border border-border"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-gold animate-pulse-glow" />
            <h3 className="font-serif text-xl font-bold text-foreground">Proficiency</h3>
          </div>
          <div className="flex flex-col gap-4">
            <SkillMeter label="React / Next.js" level={92} index={0} />
            <SkillMeter label="Flutter / Dart" level={88} index={1} />
            <SkillMeter label="TypeScript" level={90} index={2} />
            <SkillMeter label="UI/UX Design" level={85} index={3} />
            <SkillMeter label="Backend (Node)" level={72} index={4} />
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {strengths.map((s, i) => (
            <motion.div
              key={s}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              className="px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-sm shadow-skeuo"
            >
              {s}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
