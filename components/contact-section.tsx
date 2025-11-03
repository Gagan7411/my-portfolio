"use client"

import { motion } from "motion/react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

export function ContactSection() {
  const { data } = usePortfolio()
  const { hero } = data

  return (
    <section id="contact" className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Feel free to reach out for collaborations or opportunities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-6 md:p-12 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Contact Information</h3>
              </div>

              <a
                href={`mailto:${hero.email}`}
                className="flex items-start gap-4 p-3 md:p-4 rounded-lg hover:bg-muted transition-colors group"
              >
                <Mail className="w-5 md:w-6 h-5 md:h-6 text-primary mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">Email</p>
                  <p className="text-muted-foreground text-xs md:text-sm break-all">{hero.email}</p>
                </div>
              </a>

              <a
                href={`tel:${hero.phone}`}
                className="flex items-start gap-4 p-3 md:p-4 rounded-lg hover:bg-muted transition-colors group"
              >
                <Phone className="w-5 md:w-6 h-5 md:h-6 text-primary mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">Phone</p>
                  <p className="text-muted-foreground text-xs md:text-sm">{hero.phone}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3 md:p-4 rounded-lg">
                <MapPin className="w-5 md:w-6 h-5 md:h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">Location</p>
                  <p className="text-muted-foreground text-xs md:text-sm">{hero.location}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 md:pt-4">
                <p className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Follow Me</p>
                <div className="flex gap-3 md:gap-4">
                  {hero.linkedIn && (
                    <a
                      href={hero.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 md:p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="w-5 md:w-6 h-5 md:h-6" />
                    </a>
                  )}
                  {hero.github && (
                    <a
                      href={hero.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 md:p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Github className="w-5 md:w-6 h-5 md:h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Send a Message</h3>
              <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-3 md:space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full px-3 md:px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-3 md:px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  required
                />
                <Button type="submit" className="w-full text-sm md:text-base">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
