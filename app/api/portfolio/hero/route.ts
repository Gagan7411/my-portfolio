import { NextResponse } from "next/server"

let heroData = {
  name: "Gagan M",
  title: "BCA Graduate | Data Analytics & AI/ML Enthusiast",
  description: "Passionate about building innovative solutions using AI and data analytics",
  email: "mgagan8792@gmail.com",
  phone: "7411685451",
  location: "Bangalore, India",
  image: "/professional-portrait.jpg",
  github: "https://github.com",
  linkedIn: "https://linkedin.com",
}

export async function GET() {
  return NextResponse.json(heroData)
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    heroData = { ...heroData, ...body }
    return NextResponse.json(heroData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 400 })
  }
}
