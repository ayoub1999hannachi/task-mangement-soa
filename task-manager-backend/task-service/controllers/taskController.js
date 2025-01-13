const Task = require("../models/Task");


exports.createTask = async (req, res) => {
    const { name, description, priority, status, assignee, deadline } = req.body;
  
    try {
      const task = await Task.create({
        name,
        description,
        priority,
        status,
        assignee,
        deadline: deadline ? new Date(deadline) : null,  // Convert to Date object
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, priority, status, assignee, deadline } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { name, description, priority, status, assignee, deadline: deadline ? new Date(deadline) : null },  // Convert to Date object
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTask= async(req, res) =>{
  const { id } = req.params;
  try {
    const task = await Task.findById(id); // Use "task" for consistency
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task from any projects it belongs to
    await Project.updateMany({ tasks: id }, { $pull: { tasks: id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.gettaskByuser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignee: userId }).populate('assignee');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks for user', error });
  }
};

const axios = require('axios');


exports.findTasksByAssignee = async (req, res) => {
  const { assigneeId } = req.params;
  console.log('Assignee ID:', assigneeId); // Log assigneeId to debug

  try {
    // Find tasks assigned to the specified user without populating assignee
    const tasks = await Task.find({ assignee: assigneeId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for the specified assignee' });
    }

    // Make a request to the user service to get the user details by assigneeId
    const userResponse = await axios.get(`http://localhost:4001/api/auth/profile/${assigneeId}`); // Assuming user-service is running on port 4002

    if (!userResponse.data) {
      return res.status(404).json({ message: 'Assignee not found in user-service' });
    }

    // Attach the user data to each task
    tasks.forEach(task => {
      task.assignee = userResponse.data;
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error); // Log the full error to get more insight
    res.status(500).json({ message: 'Error retrieving tasks by assignee', error });
  }
};
