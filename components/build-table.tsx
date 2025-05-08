"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Pencil, Trash2, ChevronDown, ChevronUp, Search } from "lucide-react"
import { deleteBuild } from "@/lib/actions"

export function BuildTable({ builds }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("timestamp")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredBuilds = builds.filter(
    (build) =>
      build.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      build.outcome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString()
  }

  const formatDuration = (seconds) => {
    if (!seconds) return "N/A"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search builds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("build_id")}>
                <div className="flex items-center">
                  Build ID
                  <SortIcon field="build_id" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("project_name")}>
                <div className="flex items-center">
                  Project
                  <SortIcon field="project_name" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("timestamp")}>
                <div className="flex items-center">
                  Timestamp
                  <SortIcon field="timestamp" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("duration")}>
                <div className="flex items-center">
                  Duration
                  <SortIcon field="duration" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("outcome")}>
                <div className="flex items-center">
                  Outcome
                  <SortIcon field="outcome" />
                </div>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBuilds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No builds found.
                </TableCell>
              </TableRow>
            ) : (
              sortedBuilds.map((build) => (
                <TableRow key={build.build_id}>
                  <TableCell>#{build.build_id}</TableCell>
                  <TableCell>{build.project_name}</TableCell>
                  <TableCell>{formatDate(build.timestamp)}</TableCell>
                  <TableCell>{formatDuration(build.duration)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        build.outcome === "Success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {build.outcome}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/builds/${build.build_id}/edit`}>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => deleteBuild(build.build_id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
