<template>
  <div class="login-container">
    <!-- Home Icon (Top Left) -->
    <div class="home-icon" @click="goHome">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 20v-6h4v6m7-7-9-9-9 9V20h18v-7z"></path>
      </svg>
    </div>

    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" :disabled="loading" class="submit-btn">
          Login
        </button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <div class="register-link">
        <p>Don't have an account?</p>
        <a href="/register">Register here</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        if (!this.email || !this.password) {
          this.errorMessage = 'All fields are required!';
          return;
        }

        this.errorMessage = '';

        const response = await axios.post('http://localhost:4001/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        const userId = response.data.userId;

        // Save both the token and userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        this.$router.push('/'); // Redirect to the profile page after login
      } catch (error) {
        this.errorMessage = error.response?.data.message || 'Login failed!';
      } finally {
        this.loading = false;
      }
    },
    goHome() {
      this.$router.push('/'); // Redirect to homepage
    },
  },
};
</script>

<style scoped>
/* Add the same styling you have */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.home-icon {
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  font-size: 36px;
  color: #007bff;
}

.home-icon:hover {
  color: #0056b3;
}

.login-card {
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  font-weight: bold;
}

.input-group input {
  width: 93%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.register-link {
  margin-top: 1.5rem;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
