"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, Sparkles } from "lucide-react"

export function ContactSection() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=k29120shalini%40gmail.com"
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      {/* Animated background circles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ rotate: backgroundRotate }}
      >
        <div className="absolute inset-0 border border-primary/10 rounded-full" />
        <div className="absolute inset-8 border border-primary/15 rounded-full" />
        <div className="absolute inset-16 border border-primary/10 rounded-full" />
      </motion.div>
      
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10" ref={ref}>
        {/* Section number - drops from top with bounce */}
        <motion.p 
          initial={{ opacity: 0, y: -80, scale: 0.5 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="text-primary font-mono mb-4 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={isInView ? { 
              rotate: [0, 15, -15, 0],
            } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.span>
          <span>05. What&apos;s Next?</span>
          <motion.span
            animate={isInView ? { 
              rotate: [0, -15, 15, 0],
            } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.span>
        </motion.p>
        
        {/* Title - letters cascade from top with wave effect */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-foreground mb-6"
        >
          {"Get In Touch".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -100, rotateX: 90 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
              } : {}}
              transition={{ 
                delay: 0.2 + index * 0.05, 
                duration: 0.6,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ 
                scale: 1.3, 
                y: -5,
                transition: { duration: 0.15 }
              }}
              className="inline-block cursor-default transition-colors hover:text-primary"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>
        
        {/* Description - fades in with blur from center */}
        <motion.p 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-lg mx-auto"
        >
          I&apos;m currently looking for new opportunities. Whether you have a question 
          or just want to say hi, my inbox is always open. I&apos;ll try my best to 
          get back to you!
        </motion.p>

        {/* Button - bounces in from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.5 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-12 py-6 text-base font-mono relative overflow-hidden group"
              asChild
            >
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <motion.span
                  className="absolute inset-0 bg-primary"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Say Hello
                  <motion.span
                    animate={{ 
                      x: [0, 5, 0],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.span>
                </span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Decorative animated lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-20 flex justify-center items-center gap-4"
        >
          <motion.div
            className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 100 } : {}}
            transition={{ delay: 1.3, duration: 0.8 }}
          />
          <motion.div
            className="flex gap-2"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </motion.div>
          <motion.div
            className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 100 } : {}}
            transition={{ delay: 1.3, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
