import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BugForm } from "@/components/bug-form"
import { getTasks } from "@/lib/data"

export default async function NewBugPage() {
  const tasks = await getTasks()

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Report New Bug</h1>

      <Card>
        <CardHeader>
          <CardTitle>Bug Information</CardTitle>
          <CardDescription>Report a new bug in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <BugForm tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  )
}
