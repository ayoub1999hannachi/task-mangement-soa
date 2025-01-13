const Project = require("../models/Project");

// Create a new project
exports.createProject = async (req, res) => {
  const { name, description, members, startDate, endDate } = req.body;

  try {
    const project = await Project.create({ name, description, members, startDate, endDate });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, members, startDate, endDate } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, members, startDate, endDate },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("tasks");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a task to a project
exports.addTaskToProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description, priority, status, assignee, deadline } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await Task.create({
      name,
      description,
      priority,
      status,
      assignee,
      deadline: deadline ? new Date(deadline) : null,
    });

    project.tasks.push(task._id); // Add the task to the project's task list
    await project.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
