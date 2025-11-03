// CMS Data Types for Portfolio

export interface HeroData {
  id?: string
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string
  image: string
  linkedIn?: string
  github?: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number
  location: string
}

export interface SkillItem {
  id: string
  name: string
  category: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  link?: string
  image?: string
  startDate: string
  endDate: string
}

export interface ResearchItem {
  id: string
  title: string
  description: string
  link?: string
  image?: string
}

export interface PortfolioData {
  hero: HeroData
  education: EducationItem[]
  skills: SkillItem[]
  projects: ProjectItem[]
  research: ResearchItem[]
}