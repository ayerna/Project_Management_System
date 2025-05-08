"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBuild, updateBuild } from "@/lib/actions"

export function BuildForm({ projects, build = null }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    project_id: build?.project_id?.toString() || "",
    duration: build?.duration?.toString() || "",
    outcome: build?.outcome || "Success",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (build) {
        await updateBuild(build.build_id, formData)
      } else {
        await createBuild(formData)
      }
      router.push("/builds")
      router.refresh()
    } catch (error) {
      console.error("Error saving build:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="project_id">Project</Label>
          <Select
            value={formData.project_id}
            onValueChange={(value) => handleSelectChange("project_id", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.project_id} value={project.project_id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="duration">Duration (seconds)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="outcome">Outcome</Label>
          <Select value={formData.outcome} onValueChange={(value) => handleSelectChange("outcome", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Failure">Failure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/builds")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : build ? "Update Build" : "Add Build"}
        </Button>
      </div>
    </form>
  )
}
