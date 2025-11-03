"use client"

import { motion } from "motion/react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const { data } = usePortfolio()
  const { hero } = data
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [index, setIndex] = useState(0)

  const texts = ["Problem Solver", "Data Analytics Enthusiast", "AI Enthusiast", "Web Developer"]
  const currentText = texts[index]

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
            setIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index, currentText])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-card pt-20 pb-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Mobile Profile Image - Top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:hidden w-full flex justify-center order-first"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-30 animate-pulse" />
              <img
                src={hero.image || "/placeholder.svg"}
                alt={hero.name}
                className="relative w-48 h-48 rounded-full object-cover border-4 border-primary/20"
              />
            </div>
          </motion.div>

          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-foreground mb-2"
              >
                Hi, I'm <span className="text-primary">{hero.name}</span>
                <span className="ml-2 inline-block animate-bounce">👋</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground font-semibold h-8 md:h-10"
              >
                {displayText}
                <span className="animate-pulse">|</span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {hero.description}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-2 text-sm md:text-base"
            >
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
                <span>{hero.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-5 h-5" />
                <span>{hero.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <MapPin className="w-5 h-5" />
                <span>{hero.location}</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4 pt-4 flex-wrap"
            >
              {hero.linkedIn && (
                <a
                  href={hero.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {hero.github && (
                <a
                  href={hero.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              <a
                href={hero.github || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 ml-auto md:ml-0"
              >
                <span className="text-sm font-medium">Learn More</span>
              </a>
            </motion.div>
          </div>

          {/* Desktop Profile Image - Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex flex-1 justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <img
                src={hero.image || "/placeholder.svg"}
                alt={hero.name}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl object-cover border-4 border-primary/20"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
