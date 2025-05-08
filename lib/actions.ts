"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import bcrypt from "bcryptjs"

// User actions
export async function createUser(userData) {
  const { name, email, role, password } = userData

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.query("INSERT INTO users (name, role, email, password_hash) VALUES (?, ?, ?, ?)", [
    name,
    role,
    email,
    hashedPassword,
  ])

  revalidatePath("/users")
}

export async function updateUser(id, userData) {
  const { name, email, role, password } = userData

  if (password) {
    // If password is provided, update it too
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.query("UPDATE users SET name = ?, role = ?, email = ?, password_hash = ? WHERE user_id = ?", [
      name,
      role,
      email,
      hashedPassword,
      id,
    ])
  } else {
    // Otherwise just update the other fields
    await db.query("UPDATE users SET name = ?, role = ?, email = ? WHERE user_id = ?", [name, role, email, id])
  }

  revalidatePath("/users")
}

export async function deleteUser(id) {
  await db.query("DELETE FROM users WHERE user_id = ?", [id])
  revalidatePath("/users")
}

// Project actions
export async function createProject(projectData) {
  const { name, description, start_date, end_date } = projectData

  await db.query("INSERT INTO projects (name, description, start_date, end_date) VALUES (?, ?, ?, ?)", [
    name,
    description,
    start_date,
    end_date,
  ])

  revalidatePath("/projects")
}

export async function updateProject(id, projectData) {
  const { name, description, start_date, end_date } = projectData

  await db.query("UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ? WHERE project_id = ?", [
    name,
    description,
    start_date,
    end_date,
    id,
  ])

  revalidatePath("/projects")
}

export async function deleteProject(id) {
  await db.query("DELETE FROM projects WHERE project_id = ?", [id])
  revalidatePath("/projects")
}

// Task actions
export async function createTask(taskData) {
  const { project_id, title, description, assigned_to, status, deadline } = taskData

  await db.query(
    "INSERT INTO tasks (project_id, title, description, assigned_to, status, deadline) VALUES (?, ?, ?, ?, ?, ?)",
    [project_id, title, description, assigned_to || null, status, deadline],
  )

  revalidatePath("/tasks")
}

export async function updateTask(id, taskData) {
  const { project_id, title, description, assigned_to, status, deadline } = taskData

  await db.query(
    "UPDATE tasks SET project_id = ?, title = ?, description = ?, assigned_to = ?, status = ?, deadline = ? WHERE task_id = ?",
    [project_id, title, description, assigned_to || null, status, deadline, id],
  )

  revalidatePath("/tasks")
}

export async function deleteTask(id) {
  await db.query("DELETE FROM tasks WHERE task_id = ?", [id])
  revalidatePath("/tasks")
}

// Bug actions
export async function createBug(bugData) {
  const { task_id, description, severity, status, reported_date } = bugData

  await db.query("INSERT INTO bugs (task_id, description, severity, status, reported_date) VALUES (?, ?, ?, ?, ?)", [
    task_id,
    description,
    severity,
    status,
    reported_date,
  ])

  revalidatePath("/bugs")
}

export async function updateBug(id, bugData) {
  const { task_id, description, severity, status, reported_date, resolved_date } = bugData

  await db.query(
    "UPDATE bugs SET task_id = ?, description = ?, severity = ?, status = ?, reported_date = ?, resolved_date = ? WHERE bug_id = ?",
    [task_id, description, severity, status, reported_date, resolved_date, id],
  )

  revalidatePath("/bugs")
}

export async function deleteBug(id) {
  await db.query("DELETE FROM bugs WHERE bug_id = ?", [id])
  revalidatePath("/bugs")
}

// Build actions
export async function createBuild(buildData) {
  const { project_id, duration, outcome } = buildData

  await db.query("INSERT INTO builds (project_id, duration, outcome) VALUES (?, ?, ?)", [project_id, duration, outcome])

  revalidatePath("/builds")
}

export async function updateBuild(id, buildData) {
  const { project_id, duration, outcome } = buildData

  await db.query("UPDATE builds SET project_id = ?, duration = ?, outcome = ? WHERE build_id = ?", [
    project_id,
    duration,
    outcome,
    id,
  ])

  revalidatePath("/builds")
}

export async function deleteBuild(id) {
  await db.query("DELETE FROM builds WHERE build_id = ?", [id])
  revalidatePath("/builds")
}
