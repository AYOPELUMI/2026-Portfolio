"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Smartphone, Globe, ChevronLeft, ChevronRight } from "lucide-react"

type Project = {
  title: string
  stack: string
  description: string
  url: string
  type: "web" | "flutter"
}

const webProjects: Project[] = [
  {
    title: "Snippet Manager",
    stack: "Next.js, TypeScript, Supabase, GraphQL",
    description: "Full-stack app for organizing and managing code snippets. Integrated Supabase for auth and storage, GraphQL for data ops.",
    url: "https://snippet-manager-rho.vercel.app",
    type: "web",
  },
  {
    title: "Movie App",
    stack: "Next.js, TypeScript, TMDB API",
    description: "Responsive movie discovery platform. Advanced state handling with Zustand and optimized performance using React Query.",
    url: "https://ayopelumi-moive-app.vercel.app",
    type: "web",
  },
  {
    title: "Afrogarm",
    stack: "Next.js, GraphQL",
    description: "Modern e-commerce front-end for a fashion brand. GraphQL for product data, rich animations for user experience.",
    url: "https://afrogarm.com",
    type: "web",
  },
  {
    title: "Voltis Lab",
    stack: "Next.js",
    description: "High-performance, SEO-optimized landing page for a tech company. Animations, optimized assets, cross-device accessibility.",
    url: "https://voltislab.com",
    type: "web",
  },
  {
    title: "My Portfolio",
    stack: "Next.js, Three.js, GSAP",
    description: "3D-animated personal portfolio showcasing web projects, skills, and experience using Three.js and GSAP.",
    url: "https://ayopelumi.vercel.app",
    type: "web",
  },
  {
    title: "Moneta",
    stack: "Next.js",
    description: "Minimalistic financial dashboard showcasing transactions and budget summaries with clean UI patterns.",
    url: "https://moneta-psi.vercel.app",
    type: "web",
  },
]

const flutterProjects: Project[] = [
  {
    title: "Prelura",
    stack: "Flutter, Riverpod, Firebase",
    description: "Full-featured mobile app with real-time communication, push notifications, and scalable architecture.",
    url: "#",
    type: "flutter",
  },
  {
    title: "Aguro App",
    stack: "Flutter, GetX",
    description: "Connecting farmers and buyers directly. State management and routing with GetX.",
    url: "#",
    type: "flutter",
  },
  {
    title: "Book App",
    stack: "Flutter, Riverpod, APIs",
    description: "Archive of books easily accessible and stored with Riverpod as provider and external APIs.",
    url: "#",
    type: "flutter",
  },
  {
    title: "Outfeatz",
    stack: "Flutter, Firebase",
    description: "Mobile application developed at Voltis Labs with real-time features and pixel-perfect Figma implementation.",
    url: "#",
    type: "flutter",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0, rotateX: 5 }}
      animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative h-full bg-card rounded-xl overflow-hidden texture-leather shadow-skeuo border border-border"
      >
        {/* Project type indicator */}
        <div className="absolute top-3 right-3 z-10">
          <div className="w-8 h-8 rounded-full bg-secondary texture-metal shadow-skeuo flex items-center justify-center">
            {project.type === "web" ? (
              <Globe className="w-4 h-4 text-primary" />
            ) : (
              <Smartphone className="w-4 h-4 text-primary" />
            )}
          </div>
        </div>

        {/* Color bar top */}
        <div className="h-1.5 bg-primary/80" />

        <div className="p-5">
          <h3 className="text-lg font-serif font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.split(", ").map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-secondary/80 text-muted-foreground font-mono text-[10px] shadow-skeuo-pressed border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed font-mono mb-4">
            {project.description}
          </p>

          {/* Link button */}
          {project.url !== "#" && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-primary font-mono text-xs hover:underline"
            >
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          )}
        </div>

        {/* Bottom decorative stitching */}
        <div className="absolute bottom-0 left-4 right-4 h-px border-t border-dashed border-gold/15" />
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<"web" | "flutter">("web")
  const projects = activeTab === "web" ? webProjects : flutterProjects

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card texture-metal rounded-xl px-8 py-4 shadow-skeuo-deep border border-border mb-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground gold-emboss">
              Selected Works
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-lg mx-auto">
            A curated collection of projects that showcase my craft and passion for building.
          </p>
        </motion.div>

        {/* Tab switcher - skeuomorphic toggle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 bg-secondary/50 rounded-xl p-1.5 shadow-skeuo-pressed texture-metal border border-border">
            {(["web", "flutter"] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-2.5 rounded-lg font-mono text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="projectTab"
                    className="absolute inset-0 bg-primary rounded-lg shadow-skeuo"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === "web" ? <Globe className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  {tab}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
