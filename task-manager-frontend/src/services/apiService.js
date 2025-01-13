import axios from 'axios';

const API_URL = 'http://localhost:4001/api/users'; // Adjust the URL if needed

// Get user profile by ID
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Returning user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Returning the newly registered user data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Returning user authentication data (e.g., token)
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
