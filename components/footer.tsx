"use client"

import { Heart, Code } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Developed by section */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Developed with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>and even</span>
            <Code className="w-4 h-4 text-primary" />
            <span>by</span>
            <a
              href="https://github.com/Gagan7411"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Gagan
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://github.com/Gagan7411"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://linkedin.com/in/gagan-m-46997a289"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}