"use client"

import type React from "react"
import { motion } from "motion/react"
import { Home, Menu, Github, Linkedin, Sun, Moon } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { useState, useEffect } from "react"

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  // ... rest of your navbar code
