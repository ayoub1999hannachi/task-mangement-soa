<template>
    <header class="app-header">
      <div class="logo">
        <a href="/" class="logo-link">
          <img :src="logo" alt="logo" class="logo-img" />
          
        </a>
      </div>
      <nav class="nav-bar">
        <ul>
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/tasks" class="nav-link">Tasks</a></li>
          <li><a href="/profile" class="nav-link">Profile</a></li>
          <li><a href="/contact" class="nav-link">Contact</a></li>
  
          <!-- Conditionally Render User Greeting and Logout if Authenticated -->
          <li v-if="isAuthenticated">
            <span class="user-greeting">Hello, {{ user.username }}</span>
          </li>
  
          <!-- Conditionally Render Login and Register Links if Not Authenticated -->
          <li v-if="!isAuthenticated">
            <a href="/login" class="nav-link">Login</a>
          </li>
          <li v-if="!isAuthenticated">
            <a href="/register" class="nav-link">Register</a>
          </li>
  
          <!-- Logout Button if Authenticated -->
          <li v-if="isAuthenticated">
            <button class="logout-button" @click="logout">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Header',
    props: {
      logo: {
        type: String,
        default: '/assets/logo.png', // Provide a fallback logo path
      },
    },
    data() {
      return {
        isAuthenticated: false, // Track authentication status
        user: {}, // Store user info (name, etc.)
      };
    },
    mounted() {
      this.checkAuthentication(); // Check authentication when the component mounts
    },
    methods: {
      async fetchUserProfile() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.isAuthenticated = false;
            return;
          }
  
          const response = await axios.get('http://localhost:4001/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = response.data; // This will exclude the password due to toJSON method
          this.isAuthenticated = true;
        } catch (error) {
          console.error('Error fetching user profile:', error);
          this.isAuthenticated = false;
        }
      },
      logout() {
        this.isAuthenticated = false;
        this.user = {};
        // Remove user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Redirect to login page
        this.$router.push('/login');
      },
      checkAuthentication() {
        const token = localStorage.getItem('token');
  
        if (token) {
          this.isAuthenticated = true;
          this.fetchUserProfile();
        } else {
          this.isAuthenticated = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Header Styles */
  .app-header {
    background: linear-gradient(90deg, #0a74da, #3366cc); /* Sleek gradient */
    padding: 15px 30px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid #0056b3; /* Subtle border for extra depth */
    transition: all 0.3s ease;
  }
  
  .app-header:hover {
    background: linear-gradient(90deg, #0056b3, #0a74da); /* Subtle hover effect */
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .logo-img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .logo-img:hover {
    transform: scale(1.1);
  }
  
  .nav-bar ul {
    list-style: none;
    display: flex;
    gap: 25px;
    margin: 0;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 1.1em;
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 30px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #ffffff30;
    color: #ffffff;
    text-decoration: none;
  }
  
  .logout-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 30px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .logout-button:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }
  
  .user-greeting {
    font-size: 1.2em;
    font-weight: 500;
    color: #f8f9fa;
  }
  
  @media (max-width: 768px) {
    .app-header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .nav-bar ul {
      flex-direction: column;
      gap: 15px;
    }
  
    .nav-link {
      font-size: 1.2em;
      padding: 12px 18px;
    }
  }
  </style>
  