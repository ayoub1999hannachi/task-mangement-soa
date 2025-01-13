import axios from 'axios';

const API_URL = 'http://localhost:4002/api/projects'; // Adjust the URL if needed

// Get all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Returning the project data
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    return response.data; // Returning the created project
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update an existing project by ID
export const updateProject = async (projectId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${projectId}`, updatedData);
    return response.data; // Returning the updated project
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete a project by ID
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}/${projectId}`);
    return response.data; // Returning the response after deleting the project
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
