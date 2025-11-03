"use client"

import type React from "react"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import type { ResearchItem } from "@/lib/types"
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

export function ResearchManager() {
  const { data, addResearch, updateResearch, deleteResearch } = usePortfolio()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<ResearchItem, "id">>({
    title: "",
    description: "",
    link: "",
    image: "",
  })

  const handleOpen = (item?: ResearchItem) => {
    if (item) {
      setEditingId(item.id)
      setFormData({
        title: item.title,
        description: item.description,
        link: item.link || "",
        image: item.image || "",
      })
    } else {
      setEditingId(null)
      setFormData({
        title: "",
        description: "",
        link: "",
        image: "",
      })
    }
    setIsOpen(true)
  }

  const handleSave = () => {
    if (editingId) {
      updateResearch(editingId, formData)
    } else {
      addResearch(formData)
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
        Add Research
      </Button>

      <div className="space-y-3">
        {data.research.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpen(item)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteResearch(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {item.link && (
              <CardContent>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Research
                </a>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitleComponent>{editingId ? "Edit Research" : "Add Research"}</DialogTitleComponent>
            <DialogDescription>Update your research information</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Research title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Research description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Research Link</Label>
              <Input id="link" name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
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
