import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskForm } from "@/components/task-form"
import { getProjects, getUsers } from "@/lib/data"

export default async function NewTaskPage() {
  const projects = await getProjects()
  const users = await getUsers()

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Task</h1>

      <Card>
        <CardHeader>
          <CardTitle>Task Information</CardTitle>
          <CardDescription>Create a new task in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm projects={projects} users={users} />
        </CardContent>
      </Card>
    </div>
  )
}
