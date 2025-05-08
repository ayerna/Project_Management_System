import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BugForm } from "@/components/bug-form"
import { getBugById, getTasks } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function EditBugPage({ params }) {
  const bug = await getBugById(params.id)
  const tasks = await getTasks()

  if (!bug) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Bug</h1>

      <Card>
        <CardHeader>
          <CardTitle>Bug Information</CardTitle>
          <CardDescription>Update bug details.</CardDescription>
        </CardHeader>
        <CardContent>
          <BugForm bug={bug} tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  )
}
