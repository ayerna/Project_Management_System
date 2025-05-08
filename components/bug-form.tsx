"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { createBug, updateBug } from "@/lib/actions"

export function BugForm({ tasks, bug = null }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    task_id: bug?.task_id?.toString() || "",
    description: bug?.description || "",
    severity: bug?.severity || "Medium",
    status: bug?.status || "Open",
    reported_date: bug?.reported_date
      ? new Date(bug.reported_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    resolved_date: bug?.resolved_date ? new Date(bug.resolved_date).toISOString().split("T")[0] : "",
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
      if (bug) {
        await updateBug(bug.bug_id, formData)
      } else {
        await createBug(formData)
      }
      router.push("/bugs")
      router.refresh()
    } catch (error) {
      console.error("Error saving bug:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="task_id">Related Task</Label>
          <Select value={formData.task_id} onValueChange={(value) => handleSelectChange("task_id", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task.task_id} value={task.task_id.toString()}>
                  {task.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="severity">Severity</Label>
          <Select value={formData.severity} onValueChange={(value) => handleSelectChange("severity", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="reported_date">Reported Date</Label>
          <Input
            id="reported_date"
            name="reported_date"
            type="date"
            value={formData.reported_date}
            onChange={handleChange}
            required
          />
        </div>

        {(formData.status === "Resolved" || formData.status === "Closed") && (
          <div className="grid gap-2">
            <Label htmlFor="resolved_date">Resolved Date</Label>
            <Input
              id="resolved_date"
              name="resolved_date"
              type="date"
              value={formData.resolved_date}
              onChange={handleChange}
              required
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/bugs")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : bug ? "Update Bug" : "Report Bug"}
        </Button>
      </div>
    </form>
  )
}
