"use client"

import type React from "react"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import type { ProjectItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle as DialogTitleComponent,
} from "@/components/ui/dialog"
import { Trash2, Edit2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ProjectManager() {
  const { data, addProject, updateProject, deleteProject } = usePortfolio()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<ProjectItem, "id">>({
    title: "",
    description: "",
    technologies: [],
    link: "",
    image: "",
    startDate: new Date().getFullYear().toString(),
    endDate: new Date().getFullYear().toString(),
  })
  const [techInput, setTechInput] = useState("")

  const handleOpen = (item?: ProjectItem) => {
    if (item) {
      setEditingId(item.id)
      setFormData({
        title: item.title,
        description: item.description,
        technologies: item.technologies,
        link: item.link || "",
        image: item.image || "",
        startDate: item.startDate,
        endDate: item.endDate,
      })
    } else {
      setEditingId(null)
      setFormData({
        title: "",
        description: "",
        technologies: [],
        link: "",
        image: "",
        startDate: new Date().getFullYear().toString(),
        endDate: new Date().getFullYear().toString(),
      })
    }
    setTechInput("")
    setIsOpen(true)
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput],
      }))
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleSave = () => {
    if (editingId) {
      updateProject(editingId, formData)
    } else {
      addProject(formData)
    }
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => handleOpen()} className="gap-2">
        <Plus className="w-4 h-4" />
        Add Project
      </Button>

      <div className="space-y-3">
        {data.projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpen(project)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {project.startDate} - {project.endDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitleComponent>{editingId ? "Edit Project" : "Add Project"}</DialogTitleComponent>
            <DialogDescription>Update your project information</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <Input id="link" name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tech">Technologies</Label>
              <div className="flex gap-2">
                <Input
                  id="tech"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTech()}
                  placeholder="Add a technology"
                />
                <Button onClick={handleAddTech} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTech(tech)}
                  >
                    {tech} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
