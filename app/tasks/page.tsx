import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTasks } from "@/lib/data"
import { TaskTable } from "@/components/task-table"

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Link href="/tasks/new">
          <Button>Add Task</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskTable tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  )
}
