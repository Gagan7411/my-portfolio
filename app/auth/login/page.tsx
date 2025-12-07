"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Chrome } from "lucide-react"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/admin")
    }
  }, [session, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-card p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Sign in with your authorized account to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
            variant="outline"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </Button>
          
          <Button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
            variant="outline"
          >
            <Chrome className="w-5 h-5" />
            Sign in with Google
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-4">
            Only authorized admin accounts can access this area
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
