"use client"

import type React from "react"
import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import type { HeroData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, Mail, MapPin, Github, Linkedin } from "lucide-react"

export function ProfileManager() {
  const { data, updateHero } = usePortfolio()
  const [formData, setFormData] = useState<HeroData>(data.hero)
  const [isSaved, setIsSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setIsSaved(false)
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/portfolio/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        updateHero(formData)
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
      }
    } catch (error) {
      console.error("Failed to save profile:", error)
      updateHero(formData)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl">Profile Information</CardTitle>
          <CardDescription className="text-sm md:text-base">Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm md:text-base">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="text-sm md:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm md:text-base">
                Title / Profession
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Full Stack Developer"
                className="text-sm md:text-base"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm md:text-base">
              About You
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell something about yourself"
              rows={3}
              className="text-sm md:text-base"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-sm md:text-base flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm md:text-base">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="text-sm md:text-base"
                />
              </div>
            </div>
          </div>

          {/* Location & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm md:text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="text-sm md:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm md:text-base">
                Profile Image URL
              </Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="text-sm md:text-base"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-sm md:text-base flex items-center gap-2">
              <Github className="w-4 h-4" />
              Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-sm md:text-base flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  name="github"
                  value={formData.github || ""}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedIn" className="text-sm md:text-base flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn || ""}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="text-sm md:text-base"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-2 pt-4">
            <Button onClick={handleSave} className="gap-2 flex-1 md:flex-none">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            {isSaved && <span className="text-xs md:text-sm text-green-600">Saved successfully!</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
