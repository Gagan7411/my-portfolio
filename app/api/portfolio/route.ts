import { NextResponse } from "next/server"

// Simulated database - in production, use a real database
let portfolioData = {
  hero: {
    name: "Gagan M",
    title: "BCA Graduate | Data Analytics & AI/ML Enthusiast",
    description: "Passionate about building innovative solutions using AI and data analytics",
    email: "mgagan8792@gmail.com",
    phone: "7411685451",
    location: "Bangalore, India",
    image: "/professional-portrait.jpg",
    github: "https://github.com",
    linkedIn: "https://linkedin.com",
  },
  education: [],
  skills: [],
  projects: [],
  research: [],
}

export async function GET() {
  return NextResponse.json(portfolioData)
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    portfolioData = { ...portfolioData, ...body }
    return NextResponse.json(portfolioData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    portfolioData = { ...portfolioData, ...body }
    return NextResponse.json(portfolioData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 400 })
  }
}
