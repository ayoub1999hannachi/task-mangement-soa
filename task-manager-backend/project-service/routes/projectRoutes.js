const express = require("express");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addTaskToProject,
  getProjectTasks,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

// Task management within a project
router.post("/:projectId/tasks", addTaskToProject); // Add a task to a project
router.get("/:projectId/tasks", getProjectTasks);  // Get all tasks for a project

module.exports = router;
