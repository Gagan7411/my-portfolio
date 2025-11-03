"use client"

import { motion } from "motion/react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export function EducationSection() {
  const { data } = usePortfolio()

  return (
    <section id="education" className="py-16 md:py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 md:w-8 h-6 md:h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Education</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">My academic background</p>
        </motion.div>

        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                    <div>
                      <CardTitle className="text-xl md:text-2xl text-foreground">{edu.institution}</CardTitle>
                      <p className="text-primary font-semibold mt-2">{edu.degree}</p>
                      <p className="text-muted-foreground text-sm">{edu.field}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{edu.location}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
