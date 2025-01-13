import axios from 'axios';

const API_URL = 'http://localhost:4003/api/tasks'; // Adjust the URL if needed

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Returning the task data
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data; // Returning the created task
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task by ID
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedData);
    return response.data; // Returning the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data; // Returning the response after deleting the task
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
