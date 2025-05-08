import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBugs } from "@/lib/data"
import { BugTable } from "@/components/bug-table"

export default async function BugsPage() {
  const bugs = await getBugs()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bugs</h1>
        <Link href="/bugs/new">
          <Button>Report Bug</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bugs</CardTitle>
        </CardHeader>
        <CardContent>
          <BugTable bugs={bugs} />
        </CardContent>
      </Card>
    </div>
  )
}
