import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bug, Clock, Users } from "lucide-react"
import { getStats } from "@/lib/data"

export default async function Dashboard() {
  const stats = await getStats()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Link href="/projects/new">
            <Button>New Project</Button>
          </Link>
          <Link href="/tasks/new">
            <Button variant="outline">New Task</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectCount}</div>
            <p className="text-xs text-muted-foreground">{stats.activeProjects} active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">{stats.completedTasks} tasks completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Bugs</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openBugs}</div>
            <p className="text-xs text-muted-foreground">{stats.criticalBugs} critical bugs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userCount}</div>
            <p className="text-xs text-muted-foreground">{stats.developerCount} developers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest tasks across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentTasks.map((task) => (
                <div key={task.task_id} className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-500"
                        : task.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Project: {task.project_name}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{task.status}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/tasks">
                <Button variant="outline" size="sm">
                  View All Tasks
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bugs</CardTitle>
            <CardDescription>Latest reported bugs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentBugs.map((bug) => (
                <div key={bug.bug_id} className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      bug.severity === "Critical"
                        ? "bg-red-500"
                        : bug.severity === "High"
                          ? "bg-orange-500"
                          : bug.severity === "Medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{bug.description.substring(0, 30)}...</p>
                    <p className="text-xs text-muted-foreground">{bug.severity} severity</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/bugs">
                <Button variant="outline" size="sm">
                  View All Bugs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
