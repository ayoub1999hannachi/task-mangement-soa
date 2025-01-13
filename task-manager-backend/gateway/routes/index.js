const express = require('express');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

// Define the routes to the backend services
const userServiceUrl = 'http://localhost:4001';  // User Service URL
const taskServiceUrl = 'http://localhost:4003';  // Task Service URL
const projectServiceUrl = 'http://localhost:4002';  // Project Service URL

// Proxy route for User Service
router.use('/users', createProxyMiddleware({
  target: userServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/users',  // Redirects /users to the /users endpoint in User Service
  },
}));

// Proxy route for Task Service
router.use('/tasks', createProxyMiddleware({
  target: taskServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/tasks': '/tasks',  // Redirects /tasks to the /tasks endpoint in Task Service
  },
}));

// Proxy route for Project Service
router.use('/projects', createProxyMiddleware({
  target: projectServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/projects': '/projects',  // Redirects /projects to the /projects endpoint in Project Service
  },
}));

// Additional route to forward requests to a specific service, e.g., /login for authentication
router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${userServiceUrl}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

module.exports = router;
