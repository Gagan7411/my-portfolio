"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/lib/theme-context"
import { PortfolioProvider } from "@/lib/portfolio-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}