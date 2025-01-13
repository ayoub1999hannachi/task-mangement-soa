<template>
    <div class="profile-container">
      <div class="profile-card">
        <h2 class="profile-title">{{ user.username }}</h2>
        <p class="profile-subtitle">{{ user.email }}</p>
        <hr class="divider">
  
        <div class="profile-actions">
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {},
      };
    },
    created() {
      this.fetchUserProfile();
    },
    methods: {
      async fetchUserProfile() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$router.push('/login');
            return;
          }
  
          const response = await axios.get('http://localhost:4001/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = response.data;  // This will exclude the password due to toJSON method
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      },
      logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container for centering the profile card */
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    margin: 0;
  }
  
  /* Profile Card Styling */
  .profile-card {
    background-color: white;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  /* Title and Subtitle Styling */
  .profile-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .profile-subtitle {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  /* Divider Styling */
  .divider {
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid #ccc;
  }
  
  /* Button Styling */
  .logout-btn {
    padding: 0.8rem 1.5rem;
    background-color: red;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .logout-btn:hover {
    background-color: darkred;
  }
  </style>
  