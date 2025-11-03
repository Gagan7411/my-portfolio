"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { PortfolioData, EducationItem, ProjectItem, ResearchItem } from "./types"
import { defaultPortfolioData } from "./default-data"

interface PortfolioContextType {
  data: PortfolioData
  updateData: (newData: PortfolioData) => void
  updateHero: (hero: PortfolioData["hero"]) => void
  addEducation: (item: Omit<EducationItem, "id">) => void
  updateEducation: (id: string, item: Omit<EducationItem, "id">) => void
  deleteEducation: (id: string) => void
  addProject: (item: Omit<ProjectItem, "id">) => void
  updateProject: (id: string, item: Omit<ProjectItem, "id">) => void
  deleteProject: (id: string) => void
  addResearch: (item: Omit<ResearchItem, "id">) => void
  updateResearch: (id: string, item: Omit<ResearchItem, "id">) => void
  deleteResearch: (id: string) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("portfolioData")
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load portfolio data:", e)
      }
    }
    setMounted(true)
  }, [])

  const updateData = (newData: PortfolioData) => {
    setData(newData)
    localStorage.setItem("portfolioData", JSON.stringify(newData))
  }

  const updateHero = (hero: PortfolioData["hero"]) => {
    const newData = { ...data, hero }
    updateData(newData)
  }

  const addEducation = (item: Omit<EducationItem, "id">) => {
    const newEducation: EducationItem = {
      ...item,
      id: Date.now().toString(),
    }
    updateData({ ...data, education: [...data.education, newEducation] })
  }

  const updateEducation = (id: string, item: Omit<EducationItem, "id">) => {
    const newEducation = data.education.map((edu) => (edu.id === id ? { ...item, id } : edu))
    updateData({ ...data, education: newEducation })
  }

  const deleteEducation = (id: string) => {
    const newEducation = data.education.filter((edu) => edu.id !== id)
    updateData({ ...data, education: newEducation })
  }

  const addProject = (item: Omit<ProjectItem, "id">) => {
    const newProject: ProjectItem = {
      ...item,
      id: Date.now().toString(),
    }
    updateData({ ...data, projects: [...data.projects, newProject] })
  }

  const updateProject = (id: string, item: Omit<ProjectItem, "id">) => {
    const newProjects = data.projects.map((proj) => (proj.id === id ? { ...item, id } : proj))
    updateData({ ...data, projects: newProjects })
  }

  const deleteProject = (id: string) => {
    const newProjects = data.projects.filter((proj) => proj.id !== id)
    updateData({ ...data, projects: newProjects })
  }

  const addResearch = (item: Omit<ResearchItem, "id">) => {
    const newResearch: ResearchItem = {
      ...item,
      id: Date.now().toString(),
    }
    updateData({ ...data, research: [...data.research, newResearch] })
  }

  const updateResearch = (id: string, item: Omit<ResearchItem, "id">) => {
    const newResearch = data.research.map((res) => (res.id === id ? { ...item, id } : res))
    updateData({ ...data, research: newResearch })
  }

  const deleteResearch = (id: string) => {
    const newResearch = data.research.filter((res) => res.id !== id)
    updateData({ ...data, research: newResearch })
  }

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        updateHero,
        addEducation,
        updateEducation,
        deleteEducation,
        addProject,
        updateProject,
        deleteProject,
        addResearch,
        updateResearch,
        deleteResearch,
      }}
    >
      {mounted && children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider")
  }
  return context
}
