"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Briefcase, GraduationCap, MapPin } from "lucide-react"

const experiences = [
  {
    id: 1,
    type: "education",
    title: "B.Eng. Computer Engineering",
    company: "University of Ilorin",
    period: "2014 - 2019",
    description: "Laid the foundation in computer engineering, algorithms, and software development principles.",
    icon: GraduationCap,
    side: "left" as const,
  },
  {
    id: 2,
    type: "work",
    title: "Front-End Developer Intern",
    company: "Acme Software Lab",
    period: "Jun 2024 - Aug 2024",
    description: "Developed and maintained scalable, responsive front-end applications. Translated design concepts into interactive and user-friendly web apps. Optimized for speed, scalability, and security.",
    icon: Briefcase,
    side: "right" as const,
  },
  {
    id: 3,
    type: "work",
    title: "Front-End Engineer",
    company: "Zilycloud Technologies",
    period: "Sep 2024 - Nov 2024",
    description: "Created visually compelling interfaces using React component libraries. Collaborated with designers and back-end developers. Participated in code reviews to maintain code quality.",
    icon: Briefcase,
    side: "left" as const,
  },
  {
    id: 4,
    type: "work",
    title: "Front-End Engineer (Flutter & Web)",
    company: "Voltis Labs",
    period: "Nov 2024 - May 2025",
    description: "Developed Android/iOS apps and web platforms. Built Prelura, Outfeatz, Spinnersonic, Afrogarm, and more. Designed scalable architectures, pixel-perfect Figma implementations, and real-time Firebase integrations.",
    icon: MapPin,
    side: "right" as const,
  },
]

function JourneyCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-6 md:gap-12 ${
        experience.side === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-12 h-12 rounded-full bg-card texture-metal shadow-skeuo-deep border-2 border-primary/50 flex items-center justify-center">
            <experience.icon className="w-5 h-5 text-primary" />
          </div>
          {/* Pulse ring */}
          <motion.div
            animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
          />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ 
          x: experience.side === "left" ? -80 : 80, 
          opacity: 0,
          rotateY: experience.side === "left" ? -10 : 10
        }}
        animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
          experience.side === "right" ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative bg-card rounded-xl p-6 texture-leather shadow-skeuo border border-border overflow-hidden group"
        >
          {/* Top accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left"
          />

          {/* Period badge */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-secondary/80 rounded-lg px-3 py-1 mb-3 shadow-skeuo-pressed"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-xs text-muted-foreground">{experience.period}</span>
          </motion.div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-1">{experience.title}</h3>
          <p className="text-primary font-mono text-sm mb-3">{experience.company}</p>
          <p className="text-muted-foreground text-sm leading-relaxed font-mono">{experience.description}</p>

          {/* Decorative corner */}
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/20 rounded-br" />
          
          {/* Hover glow */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function ExperienceJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={containerRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background texture-wood opacity-50" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section header - embossed metal plate */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-card texture-metal rounded-xl px-8 py-4 shadow-skeuo-deep border border-border mb-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground gold-emboss">
              The Journey
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-lg mx-auto">
            From university halls to production deployments - every step shaped who I am as a developer.
          </p>
        </motion.div>

        {/* Timeline path */}
        <div className="relative">
          {/* Animated SVG path */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 z-10">
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-4"
              viewBox="0 0 16 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <motion.line
                x1="8" y1="0" x2="8" y2="100"
                stroke="var(--gold)"
                strokeWidth="2"
                strokeDasharray="4 4"
                style={{ pathLength }}
                className="opacity-60"
              />
            </svg>
            {/* Glowing trail */}
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-primary/30 origin-top blur-sm"
            />
          </div>

          {/* Experience cards */}
          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <JourneyCard key={exp.id} experience={exp} index={i} />
            ))}
          </div>

          {/* Journey end marker */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-card texture-metal shadow-skeuo-deep border-2 border-primary flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full border-2 border-dashed border-primary/50"
                />
                <div className="absolute w-3 h-3 rounded-full bg-primary" />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center mt-3 font-mono text-xs text-muted-foreground"
              >
                {"& the journey continues..."}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
