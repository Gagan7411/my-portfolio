"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme") as Theme
      if (savedTheme) {
        setTheme(savedTheme)
        document.documentElement.classList.toggle("dark", savedTheme === "dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    if (typeof window === 'undefined') return
    
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  // Return default during SSR instead of throwing
  if (context === undefined) {
    if (typeof window === 'undefined') {
      return { theme: 'dark' as Theme, toggleTheme: () => {} }
    }
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}