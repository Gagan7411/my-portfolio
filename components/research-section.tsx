"use client"

import { motion } from "motion/react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, ExternalLink } from "lucide-react"

export function ResearchSection() {
  const { data } = usePortfolio()

  return (
    <section id="research" className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 md:w-8 h-6 md:h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Research</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">Innovative projects and research initiatives</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data.research.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all hover:border-primary">
                {item.image && (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-foreground">{item.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{item.description}</CardDescription>
                </CardHeader>
                {item.link && (
                  <CardContent>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
                    >
                      View Research <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
