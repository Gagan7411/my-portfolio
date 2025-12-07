"use client"

import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { AdminProtected } from "@/components/admin-protected"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, User, Mail, LogOut } from "lucide-react"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

function SettingsContent() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <main className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-primary mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Settings</h1>
          <p className="text-muted-foreground mb-8">Manage your admin account</p>

          <div className="space-y-8">
            {/* Account Information */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Account Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{session?.user?.name || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{session?.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Account Actions</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <h3 className="font-semibold text-foreground mb-2">Authentication Method</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're signed in using OAuth (GitHub/Google). To change your password or email, 
                    please update it in your GitHub or Google account settings.
                  </p>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default function SettingsPage() {
  return (
    <AdminProtected>
      <SettingsContent />
    </AdminProtected>
  )
}
