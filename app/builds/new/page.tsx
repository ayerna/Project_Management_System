import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BuildForm } from "@/components/build-form"
import { getProjects } from "@/lib/data"

export default async function NewBuildPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Build</h1>

      <Card>
        <CardHeader>
          <CardTitle>Build Information</CardTitle>
          <CardDescription>Record a new build in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <BuildForm projects={projects} />
        </CardContent>
      </Card>
    </div>
  )
}
