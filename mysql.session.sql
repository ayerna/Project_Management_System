CREATE DATABASE project_management_system;
USE project_management_system;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role ENUM('Developer','Tester','Manager') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
ALTER TABLE users
ADD COLUMN password_hash TEXT;
CREATE TABLE Project (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INT,  -- FK to users.user_id
    status ENUM('Pending','In Progress','Completed') NOT NULL DEFAULT 'Pending',
    deadline DATE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE bugs (
    bug_id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('Low','Medium','High','Critical') NOT NULL,
    status ENUM('Open','In Progress','Resolved','Closed') NOT NULL DEFAULT 'Open',
    reported_date DATE,
    resolved_date DATE,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);
CREATE TABLE builds (
    build_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    duration INT,  -- Duration in seconds
    outcome ENUM('Success','Failure') NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);