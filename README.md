# Task Management Application: A SOA Approach

[![Node.js Version](https://img.shields.io/badge/node.js-18.x%20%7C%2020.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000.svg)](https://expressjs.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)](https://vuejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern task management application built with Service-Oriented Architecture (SOA) principles, enabling flexible, scalable, and modular task organization and team collaboration.

## 📋 Overview

This application helps users organize their tasks, track progress, and manage deadlines efficiently. The core functionality leverages SOA principles where each feature is implemented as an independent service, allowing for modular development and easy maintenance.

## ✨ Key Features

- **Task Management**: Create, update, delete, and retrieve tasks
- **Deadline Tracking**: Set and monitor task deadlines
- **Priority Management**: Assign priorities to tasks
- **Progress Tracking**: Monitor task completion status
- **Task Reminders**: Get notifications for upcoming deadlines
- **Collaboration**: Work together with team members
- **User Authentication**: Secure login with JWT tokens
- **Profile Management**: View and manage user profiles

## 🏗️ Architecture

### Service-Oriented Architecture (SOA)

The application is built using SOA, providing:

- **Flexibility**: Easily add, update, or remove services without affecting other components
- **Scalability**: Scale individual services independently to handle increasing workloads
- **Reusability**: Services can be reused across different applications
- **Modularity**: Clean separation of concerns for better maintenance

### MVC Pattern

The application follows the Model-View-Controller architecture:

- **Model (MongoDB)**: Database layer using Mongoose ORM for schema definition and data interaction
- **View (Vue.js)**: Dynamic user interface that consumes APIs and handles user interactions
- **Controller (Node.js & Express)**: Processes requests, connects model and view, and serves REST APIs

## 🔧 Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for building REST APIs
- **MongoDB**: NoSQL database for flexible and scalable data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for secure authentication

### Frontend
- **Vue.js**: Progressive JavaScript framework for building user interfaces

### Development Tools
- **VS Code**: Code editor for development
- **Postman**: API testing and debugging
- **MongoDB Compass**: GUI for MongoDB database management

## 🚀 Services

### User Management Service

- **Registration**: User signup with data validation and security enforcement
- **Authentication**: Secure login using JWT tokens
- **Profile Management**: View and update user profile information

### Task Management Service

- **Task Creation**: Add new tasks with details, deadlines, and priorities
- **Task Retrieval**: Fetch tasks with filtering and sorting options
- **Task Update**: Modify existing task information
- **Task Deletion**: Remove completed or unwanted tasks

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/ayoub1999hannachi/task-mangement-soa.git

# Navigate to project directory
cd task-mangement-soa

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

## 🏃 Running the Application

```bash
# Run backend server
npm start

# Run frontend development server (in client directory)
cd client
npm run serve
```

The application will be available at:
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000`

## 📡 API Endpoints

### User Management
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Task Management
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🔒 Security

- JWT-based authentication
- Password hashing
- Input validation and sanitization
- Secure HTTP headers
- CORS configuration

## 🎯 Future Enhancements

- **Project Management Features**: Timeline tracking, resource allocation
- **Reporting Tools**: Analytics and performance metrics
- **Advanced Collaboration**: Real-time updates, team chat
- **Mobile Application**: Native iOS and Android apps
- **Integration**: Third-party service integrations (Slack, Trello, etc.)

## 👥 Team

**Created by**: HANNACHI Ayoub  
**Supervised by**: Mr. ESSID Houcine  
**Academic Year**: 2024-2025

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ayoub1999hannachi/task-mangement-soa/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

HANNACHI Ayoub - [@ayoub1999hannachi](https://github.com/ayoub1999hannachi)

Project Link: [https://github.com/ayoub1999hannachi/task-mangement-soa](https://github.com/ayoub1999hannachi/task-mangement-soa)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Note**: This project was developed as part of academic coursework under the supervision of Mr. ESSID Houcine during the 2024-2025 academic year.
