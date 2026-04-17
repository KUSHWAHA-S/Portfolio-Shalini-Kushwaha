"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const featuredProjects = [
  {
    title: "Journey Intent Tracker",
    description:
      "A behavior analytics tracker that not only shows what a user did, but also infers possible intent by analyzing their journey, key stops, and interaction patterns across the product.",
    technologies: ["Next.js", "TypeScript", "Analytics", "User Journeys", "Insights"],
    github: "#",
    external: "#",
    image: "/tracker-thumbnail.jpg",
  },
  {
    title: "Motionfolio",
    description:
      "A multi-tenant portfolio platform where a single Next.js frontend dynamically renders multiple user portfolios from configuration, routing rules, and publish or unpublish states.",
    technologies: ["Next.js", "TypeScript", "SEO", "Routing", "Config-driven UI"],
    github: "#",
    external: "https://motionfolio-btpz.vercel.app/portfolio/new",
    image: "/motionfolio-thumbnail.jpg",
  },
  {
    title: "Bus Booking Web App",
    description:
      "A modern bus booking experience focused on fast search, seat selection, and smooth checkout flows, with clear route details and user-friendly trip management across devices.",
    technologies: ["Next.js", "React", "TypeScript", "Booking Flow", "UX"],
    github: "#",
    external: "#",
    image: "/bus-booking-thumbnail.jpg",
  },
]

function FeaturedProject({
  project,
  index,
  isInView,
}: {
  project: (typeof featuredProjects)[0]
  index: number
  isInView: boolean
}) {
  const isOdd = index % 2 !== 0
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  
  // Different entry directions for each project
  const getEntryAnimation = () => {
    const animations = [
      { x: -200, y: 0, rotate: -8 },    // First: from left
      { x: 0, y: 150, rotate: 0 },       // Second: from bottom
      { x: 200, y: 0, rotate: 8 },       // Third: from right
    ]
    return animations[index % 3]
  }
  
  const entry = getEntryAnimation()
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...entry, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : {}}
      transition={{ 
        delay: index * 0.25, 
        duration: 0.8, 
        type: "spring",
        stiffness: 80
      }}
      className="relative grid md:grid-cols-12 gap-4 items-center"
    >
      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: index * 0.25 + 0.3, duration: 0.6 }}
        className={`md:col-span-7 ${
          isOdd ? "md:col-start-6" : "md:col-start-1"
        } relative group`}
      >
        <div className="relative overflow-hidden rounded-lg">
          <motion.div
            className="relative aspect-video overflow-hidden bg-primary/20 transition-all duration-300 group-hover:bg-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-primary/30 to-secondary/30" />
            )}
            <div className="absolute inset-0 bg-linear-to-br from-primary/25 via-transparent to-secondary/20 opacity-90 transition-opacity duration-300 group-hover:opacity-40" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Project Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.25 + 0.4, duration: 0.5 }}
        style={{ y }}
        className={`md:col-span-6 md:row-start-1 ${
          isOdd ? "md:col-start-1 md:text-left" : "md:col-start-7 md:text-right"
        } relative z-10`}
      >
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.25 + 0.5 }}
          className="text-primary font-mono text-sm mb-2"
        >
          Featured Project
        </motion.p>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.25 + 0.55 }}
          whileHover={{ x: isOdd ? 10 : -10 }}
          className="text-2xl font-bold text-foreground mb-4 hover:text-primary transition-colors"
        >
          {project.external === "#" ? project.title : <a href={project.external}>{project.title}</a>}
        </motion.h3>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: index * 0.25 + 0.6 }}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" }}
          className="bg-card p-6 rounded-lg shadow-xl mb-4"
        >
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.25 + 0.7 }}
          className={`flex flex-wrap gap-3 mb-4 font-mono text-sm text-muted-foreground ${
            isOdd ? "justify-start" : "md:justify-end"
          }`}
        >
          {project.technologies.map((tech, i) => (
            <motion.li 
              key={tech}
              className="transition-colors hover:text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.25 + 0.75 + i * 0.05 }}
              whileHover={{ y: -2 }}
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
        {(project.github !== "#" || project.external !== "#") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.25 + 0.85 }}
            className={`flex gap-4 ${isOdd ? "justify-start" : "md:justify-end"}`}
          >
            {project.github !== "#" && (
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {project.external !== "#" && (
              <motion.a
                href={project.external}
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-5xl px-6" ref={ref}>
        {/* Header - zooms in with rotation (different from Experience) */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12 text-foreground"
        >
          Some Things I&apos;ve Built
          <motion.span 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 h-px bg-border ml-4 max-w-xs origin-center" 
          />
        </motion.h2>
        
        {/* Featured Projects */}
        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
