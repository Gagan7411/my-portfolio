"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { AdminProtected } from "@/components/admin-protected"
import { EducationManager } from "@/components/admin/education-manager"
import { ProjectManager } from "@/components/admin/project-manager"
import { ResearchManager } from "@/components/admin/research-manager"
import { ProfileManager } from "@/components/admin/profile-manager"
import { BookOpen, Code2, Lightbulb, Settings, LogOut, User } from "lucide-react"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

function AdminContent() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleSettings = () => {
    router.push("/admin/settings")
  }

  return (
    <main className="min-h-screen bg-background py-6 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Portfolio Admin</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Welcome, {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSettings}
              className="flex items-center gap-2 bg-transparent flex-1 md:flex-none"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 flex-1 md:flex-none"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Code2 className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Lightbulb className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Research</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileManager />
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <EducationManager />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="research" className="mt-6">
            <ResearchManager />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default function AdminPage() {
  return (
    <AdminProtected>
      <AdminContent />
    </AdminProtected>
  )
}
