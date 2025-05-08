import { db } from "./db"

export async function getStats() {
  // Get project stats
  const [projectRows] = await db.query(`
    SELECT COUNT(*) as total,
    SUM(CASE WHEN end_date >= CURDATE() THEN 1 ELSE 0 END) as active
    FROM projects
  `)

  // Get task stats
  const [taskRows] = await db.query(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed
    FROM tasks
  `)

  // Get bug stats
  const [bugRows] = await db.query(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status IN ('Open', 'In Progress') THEN 1 ELSE 0 END) as open,
      SUM(CASE WHEN severity = 'Critical' AND status IN ('Open', 'In Progress') THEN 1 ELSE 0 END) as critical
    FROM bugs
  `)

  // Get user stats
  const [userRows] = await db.query(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN role = 'Developer' THEN 1 ELSE 0 END) as developers
    FROM users
  `)

  // Get recent tasks
  const [recentTasks] = await db.query(`
    SELECT t.task_id, t.title, t.status, p.name as project_name
    FROM tasks t
    JOIN projects p ON t.project_id = p.project_id
    ORDER BY t.task_id DESC
    LIMIT 5
  `)

  // Get recent bugs
  const [recentBugs] = await db.query(`
    SELECT bug_id, description, severity, status
    FROM bugs
    ORDER BY bug_id DESC
    LIMIT 5
  `)

  return {
    projectCount: projectRows[0].total,
    activeProjects: projectRows[0].active,
    pendingTasks: taskRows[0].pending,
    completedTasks: taskRows[0].completed,
    openBugs: bugRows[0].open,
    criticalBugs: bugRows[0].critical,
    userCount: userRows[0].total,
    developerCount: userRows[0].developers,
    recentTasks,
    recentBugs,
  }
}

export async function getUsers() {
  const [rows] = await db.query("SELECT * FROM users ORDER BY user_id DESC")
  return rows
}

export async function getUserById(id) {
  const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [id])
  return rows[0]
}

export async function getProjects() {
  const [rows] = await db.query("SELECT * FROM projects ORDER BY project_id DESC")
  return rows
}

export async function getProjectById(id) {
  const [rows] = await db.query("SELECT * FROM projects WHERE project_id = ?", [id])
  return rows[0]
}

export async function getTasks() {
  const [rows] = await db.query(`
    SELECT t.*, p.name as project_name, u.name as assigned_to_name
    FROM tasks t
    LEFT JOIN projects p ON t.project_id = p.project_id
    LEFT JOIN users u ON t.assigned_to = u.user_id
    ORDER BY t.task_id DESC
  `)
  return rows
}

export async function getTaskById(id) {
  const [rows] = await db.query(
    `
    SELECT t.*, p.name as project_name, u.name as assigned_to_name
    FROM tasks t
    LEFT JOIN projects p ON t.project_id = p.project_id
    LEFT JOIN users u ON t.assigned_to = u.user_id
    WHERE t.task_id = ?
  `,
    [id],
  )
  return rows[0]
}

export async function getBugs() {
  const [rows] = await db.query(`
    SELECT b.*, t.title as task_title
    FROM bugs b
    JOIN tasks t ON b.task_id = t.task_id
    ORDER BY b.bug_id DESC
  `)
  return rows
}

export async function getBugById(id) {
  const [rows] = await db.query(
    `
    SELECT b.*, t.title as task_title
    FROM bugs b
    JOIN tasks t ON b.task_id = t.task_id
    WHERE b.bug_id = ?
  `,
    [id],
  )
  return rows[0]
}

export async function getBuilds() {
  const [rows] = await db.query(`
    SELECT b.*, p.name as project_name
    FROM builds b
    JOIN projects p ON b.project_id = p.project_id
    ORDER BY b.build_id DESC
  `)
  return rows
}

export async function getBuildById(id) {
  const [rows] = await db.query(
    `
    SELECT b.*, p.name as project_name
    FROM builds b
    JOIN projects p ON b.project_id = p.project_id
    WHERE b.build_id = ?
  `,
    [id],
  )
  return rows[0]
}
