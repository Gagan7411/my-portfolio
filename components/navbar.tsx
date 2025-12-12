"use client"

import type React from "react"
import { motion } from "motion/react"
import { Home, Menu, Github, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Research", href: "#research" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { icon: Home, href: "#hero", label: "Home" },
    { icon: Github, href: "https://github.com/Gagan7411", label: "GitHub", external: true },
    { icon: Linkedin, href: "https://linkedin.com/in/gagan-m-46997a289", label: "LinkedIn", external: true },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href")
    if (href?.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: isHidden ? -120 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-card hover:text-primary rounded-lg transition-colors"
                  title={link.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background/90 backdrop-blur-md border border-border rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
               <a 
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 p-3 hover:bg-card rounded-lg transition-colors"
                >
                  <span>{link.label}</span>
                </a>
              ))}

              <div className="border-t border-border my-2" />

              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 hover:bg-card rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}