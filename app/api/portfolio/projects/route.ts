import { NextResponse } from "next/server"

let projectsData: any[] = []

export async function GET() {
  return NextResponse.json(projectsData)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newItem = { id: Date.now().toString(), ...body }
    projectsData.push(newItem)
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }
    const index = projectsData.findIndex((item) => item.id === body.id)
    if (index !== -1) {
      projectsData[index] = body
      return NextResponse.json(body)
    }
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }
    projectsData = projectsData.filter((item) => item.id !== id)
    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 400 })
  }
}
