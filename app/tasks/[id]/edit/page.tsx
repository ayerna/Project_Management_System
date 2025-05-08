import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskForm } from "@/components/task-form"
import { getTaskById, getProjects, getUsers } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function EditTaskPage({ params }) {
  const task = await getTaskById(params.id)
  const projects = await getProjects()
  const users = await getUsers()

  if (!task) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Task</h1>

      <Card>
        <CardHeader>
          <CardTitle>Task Information</CardTitle>
          <CardDescription>Update task details.</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm task={task} projects={projects} users={users} />
        </CardContent>
      </Card>
    </div>
  )
}
