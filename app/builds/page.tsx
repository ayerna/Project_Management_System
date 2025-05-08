import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBuilds } from "@/lib/data"
import { BuildTable } from "@/components/build-table"

export default async function BuildsPage() {
  const builds = await getBuilds()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Builds</h1>
        <Link href="/builds/new">
          <Button>Add Build</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Builds</CardTitle>
        </CardHeader>
        <CardContent>
          <BuildTable builds={builds} />
        </CardContent>
      </Card>
    </div>
  )
}
