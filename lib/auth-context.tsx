"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  changePassword: (oldPassword: string, newPassword: string) => boolean
  currentPassword: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default credentials - can be customized
const DEFAULT_PASSWORD = "admin123"
const STORAGE_KEY = "adminAuth"
const PASSWORD_KEY = "adminPassword"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPassword, setCurrentPassword] = useState(DEFAULT_PASSWORD)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load auth state from localStorage on mount
    const savedAuth = localStorage.getItem(STORAGE_KEY)
    const savedPassword = localStorage.getItem(PASSWORD_KEY)

    if (savedPassword) {
      setCurrentPassword(savedPassword)
    }

    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
    setMounted(true)
  }, [])

  const login = (password: string): boolean => {
    if (password === currentPassword) {
      setIsAuthenticated(true)
      localStorage.setItem(STORAGE_KEY, "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (oldPassword === currentPassword) {
      setCurrentPassword(newPassword)
      localStorage.setItem(PASSWORD_KEY, newPassword)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
        currentPassword,
      }}
    >
      {mounted && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
