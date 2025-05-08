import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects } from "@/lib/data"
import { ProjectTable } from "@/components/project-table"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link href="/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectTable projects={projects} />
        </CardContent>
      </Card>
    </div>
  )
}
