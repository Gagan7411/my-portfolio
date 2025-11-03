"use client"

import type React from "react"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import type { EducationItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle as DialogTitleComponent,
} from "@/components/ui/dialog"
import { Trash2, Edit2, Plus } from "lucide-react"

export function EducationManager() {
  const { data, addEducation, updateEducation, deleteEducation } = usePortfolio()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<EducationItem, "id">>({
    institution: "",
    degree: "",
    field: "",
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    location: "",
  })

  const handleOpen = (item?: EducationItem) => {
    if (item) {
      setEditingId(item.id)
      setFormData({
        institution: item.institution,
        degree: item.degree,
        field: item.field,
        startYear: item.startYear,
        endYear: item.endYear,
        location: item.location,
      })
    } else {
      setEditingId(null)
      setFormData({
        institution: "",
        degree: "",
        field: "",
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
        location: "",
      })
    }
    setIsOpen(true)
  }

  const handleSave = () => {
    if (editingId) {
      updateEducation(editingId, formData)
    } else {
      addEducation(formData)
    }
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Year") ? Number.parseInt(value) : value,
    }))
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => handleOpen()} className="gap-2">
        <Plus className="w-4 h-4" />
        Add Education
      </Button>

      <div className="space-y-3">
        {data.education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{edu.institution}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpen(edu)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                {edu.location} • {edu.startYear} - {edu.endYear}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitleComponent>{editingId ? "Edit Education" : "Add Education"}</DialogTitleComponent>
            <DialogDescription>Update your education information</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="University name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g., Bachelor of Science"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startYear">Start Year</Label>
                <Input
                  id="startYear"
                  name="startYear"
                  type="number"
                  value={formData.startYear}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endYear">End Year</Label>
                <Input id="endYear" name="endYear" type="number" value={formData.endYear} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
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
