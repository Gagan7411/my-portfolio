"use client"

import { SessionProvider } from "next-auth/react"
import { PortfolioProvider } from "@/lib/portfolio-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PortfolioProvider>
        {children}
      </PortfolioProvider>
    </SessionProvider>
  )
}