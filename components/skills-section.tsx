"use client"

import { motion } from "motion/react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Wrench } from "lucide-react"

export function SkillsSection() {
  const { data } = usePortfolio()

  // Group skills by category
  const groupedSkills = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof data.skills>)

  const categories = Object.keys(groupedSkills)

  return (
    <section id="skills" className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 md:w-8 h-6 md:h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="space-y-6">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wrench className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groupedSkills[category].map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}