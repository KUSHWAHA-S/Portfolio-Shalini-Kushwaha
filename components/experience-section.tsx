"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

const experiences = [
  {
    company: "HT Media",
    title: "Senior Frontend Developer",
    date: "Sep 2025 — Present",
    description: [
      "Migrating the Shine.com homepage from a legacy React and Next.js setup to a modern Next.js architecture using SSR and ISR for stronger SEO and performance.",
      "Building type-safe components with TypeScript and responsive UI systems with Tailwind CSS to improve maintainability and consistency.",
      "Managing client state with Redux and server state with React Query to streamline API fetching, caching, background updates, and error handling.",
      "Improving Core Web Vitals through code splitting, rendering optimizations, and better hydration patterns across the application.",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Redux", "React Query"],
  },
  {
    company: "HCL Technologies",
    title: "Software Developer",
    date: "Sep 2022 — Sep 2025",
    description: [
      "Contributed to Lighthouse Insightly for PayPal, a web analytics platform focused on user behavior dashboards, funnels, and cohorts.",
      "Used Apollo Client with GraphQL to optimize data fetching and reduce redundant network traffic across insight-heavy interfaces.",
      "Improved filtering, sorting, and pagination for high-volume datasets to create smoother, more reliable user interactions.",
      "Worked in Agile teams with Jira, Git, Figma, React DevTools, and Chrome Performance Profiler to ship polished iterative improvements.",
    ],
    technologies: ["React", "Apollo Client", "GraphQL", "Jira", "Figma"],
  },
]

export function ExperienceSection() {
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  
  return (
    <section className="py-24 md:py-32" ref={containerRef}>
      <motion.div
        className="mx-auto w-full max-w-5xl px-6"
        style={{ opacity, scale }}
      >
        {/* Header - slides in from LEFT */}
        <motion.h2
          initial={{ opacity: 0, x: -150, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12 text-foreground"
        >
          Where I&apos;ve Worked
          <Sparkles className="h-5 w-5 text-primary" />
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 h-px bg-border ml-4 max-w-xs origin-left"
          />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Tab List */}
          <div className="relative flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-muted">
            {experiences.map((exp, index) => (
              <motion.button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                initial={{ opacity: 0, x: -30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.2 },
                }}
                className={cn(
                  "px-5 py-3 text-sm font-mono whitespace-nowrap transition-all text-left relative overflow-hidden hover:bg-primary/10",
                  activeTab === index
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <AnimatePresence>
                  {activeTab === index && (
                    <motion.div
                      layoutId="experienceActiveTab"
                      className="absolute inset-0 bg-primary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{exp.company}</span>
              </motion.button>
            ))}
            <motion.div
              className="absolute hidden md:block left-0 w-0.5 h-11 bg-primary"
              animate={{ top: activeTab * 44 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-[350px]">
            <AnimatePresence mode="wait">
              {experiences.map(
                (exp, index) =>
                  activeTab === index && (
                    <motion.div
                      key={exp.company}
                      initial={{ opacity: 0, x: 50, rotateY: 30 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: -50, rotateY: -30 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl font-medium text-foreground"
                      >
                        {exp.title}{" "}
                        <span className="text-primary">@ {exp.company}</span>
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-sm font-mono text-muted-foreground"
                      >
                        {exp.date}
                      </motion.p>
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex gap-2 text-muted-foreground leading-relaxed"
                          >
                            <motion.span
                              className="text-primary mt-1 shrink-0"
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            >
                              {"▹"}
                            </motion.span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-2 pt-4"
                      >
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.6 + techIndex * 0.05,
                              type: "spring",
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
