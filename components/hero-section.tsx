"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Instagram, Clock } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/ayopelumi", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ogundeji-ayodeji", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@ayodeji.dev", label: "Email" },
  { icon: Clock, href: "#", label: "Wakatime" },
]

const skillBadges = [
  { label: "Flutter", top: "18%", right: "8%", delay: 1.2 },
  { label: "React", top: "35%", right: "3%", delay: 1.4 },
  { label: "Mobile Apps", top: "55%", right: "5%", delay: 1.6 },
  { label: "TypeScript", top: "72%", right: "10%", delay: 1.8 },
  { label: "Web Design", top: "45%", right: "18%", delay: 1.5 },
]

const marqueeItems = [
  "DESIGN", "SOFTWARE DEVELOPER", "MOBILE & APP DEVELOPER", "WEB DEVELOPER", "WEBSITE DESIGN",
  "FLUTTER", "REACT", "TYPESCRIPT", "UI/UX", "FRONTEND",
]

export function HeroSection() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(230,40%,12%)] via-[hsl(230,40%,12%)] to-leather" />

      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(250,60%,40%)] blur-[120px] opacity-20"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[hsl(220,70%,45%)] blur-[100px] opacity-15"
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">

            {/* Left: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.7 }}
              className="hidden lg:block"
            >
              <div className="bg-[hsl(230,30%,15%)]/80 backdrop-blur-md rounded-2xl p-6 border border-[hsl(230,30%,25%)] shadow-skeuo-deep max-w-xs">
                <div className="text-[hsl(230,20%,50%)] text-3xl font-serif mb-3">"</div>
                <p className="text-[hsl(220,15%,75%)] font-mono text-xs leading-relaxed mb-4">
                  Ayodeji's Remarkable Design Transformed Our Website - Highly Recommended!
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(250,50%,50%)] to-[hsl(220,60%,40%)] border-2 border-[hsl(230,30%,15%)] flex items-center justify-center text-[8px] text-white font-mono">
                        {["A", "B", "C", "D"][i]}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-[hsl(45,80%,55%)] text-xs">★</span>
                  ))}
                  <span className="text-[hsl(220,15%,60%)] font-mono text-[10px] ml-1">150+ Reviews (4.9 of 5)</span>
                </div>
                <p className="text-[hsl(220,15%,50%)] font-mono text-[10px] mt-1">Reviews from Valued Clients</p>
              </div>
            </motion.div>

            {/* Center: Profile + Name */}
            <div className="text-center">
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[hsl(220,15%,65%)] font-mono text-sm tracking-widest mb-4"
              >
                Hello There!
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-2"
              >
                I'm{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(250,70%,65%)] to-[hsl(220,80%,60%)] inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                >
                  Ayodeji
                </motion.span>
              </motion.h1>

              {/* Role */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[hsl(220,15%,55%)] font-mono text-sm md:text-base tracking-wide mb-8"
              >
                Front-End Web & Mobile Developer
              </motion.p>

              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
                className="relative mx-auto w-52 h-52 md:w-64 md:h-64 mb-8"
              >
                {/* Glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full border-2 border-dashed border-[hsl(250,60%,50%)]/30"
                />
                <div className="absolute -inset-4 rounded-full bg-[hsl(250,60%,50%)]/15 blur-2xl" />



                {/* Circular text around arrow */}
                {/* <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -right-6 z-10 w-20 h-20"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                    </defs>
                    <text className="fill-[hsl(220,15%,55%)] text-[9px] font-mono uppercase tracking-[3px]">
                      <textPath href="#circlePath">HIRE ME • TRY ME • HIRE ME •</textPath>
                    </text>
                  </svg>
                </motion.div> */}

                <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-[hsl(250,40%,30%)] shadow-skeuo-deep">
                  <motion.img
                    src={""}
                    alt="Ogundeji Ayodeji"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[hsl(230,40%,12%)] via-[hsl(230,40%,12%)] to-leather text-white font-mono text-sm font-semibold shadow-skeuo-deep hover:brightness-110 transition-all"
                >
                  Portfolio
                </motion.a>
                <motion.a
                  href="mailto:contact@ayodeji.dev"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3 rounded-full bg-[hsl(230,30%,18%)] border border-[hsl(250,40%,35%)] text-[hsl(220,15%,80%)] font-mono text-sm font-semibold shadow-skeuo hover:border-[hsl(250,50%,50%)] transition-all"
                >
                  Hire Me
                </motion.a>
              </motion.div>
            </div>

            {/* Right: Floating Badges + Social */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="hidden lg:flex flex-col justify-end-safe items-end gap-6"
            >
              {/* Skill badges */}
              <div className="relative w-fit flex flex-wrap">
                {skillBadges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: badge.delay, type: "spring", stiffness: 150 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 rounded-full bg-[hsl(230,30%,18%)]/90 backdrop-blur-sm border border-[hsl(250,35%,30%)] text-[hsl(220,15%,75%)] font-mono text-[10px] shadow-skeuo cursor-default whitespace-nowrap"
                    style={{ top: badge.top, right: badge.right }}
                  >
                    {badge.label}
                  </motion.div>
                ))}
              </div>

              {/* Social section */}
              <div className="text-right">
                <p className="text-[hsl(220,15%,50%)] font-mono text-[10px] tracking-widest uppercase mb-3">
                  Follow Us On
                </p>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ icon: Icon, href, label }, i) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 + i * 0.1 }}
                      whileHover={{ y: -3, scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full bg-[hsl(230,30%,18%)] border border-[hsl(250,35%,30%)] flex items-center justify-center text-[hsl(220,15%,60%)] hover:text-[hsl(250,70%,65%)] hover:border-[hsl(250,50%,50%)] transition-colors shadow-skeuo"
                      aria-label={label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="lg:hidden relative z-10 flex items-center justify-center gap-3 pb-4"
      >
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[hsl(230,30%,18%)] border border-[hsl(250,35%,30%)] flex items-center justify-center text-[hsl(220,15%,60%)] shadow-skeuo"
            aria-label={label}
          >
            <Icon className="w-3.5 h-3.5" />
          </a>
        ))}
      </motion.div>
    </section>
  )
}
