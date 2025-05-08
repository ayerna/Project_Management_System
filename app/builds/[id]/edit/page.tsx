import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BuildForm } from "@/components/build-form"
import { getBuildById, getProjects } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function EditBuildPage({ params }) {
  const build = await getBuildById(params.id)
  const projects = await getProjects()

  if (!build) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Build</h1>

      <Card>
        <CardHeader>
          <CardTitle>Build Information</CardTitle>
          <CardDescription>Update build details.</CardDescription>
        </CardHeader>
        <CardContent>
          <BuildForm build={build} projects={projects} />
        </CardContent>
      </Card>
    </div>
  )
}
