<template>
  <div class="register-container">
    <!-- Home Icon (Top Left) -->
    <div class="home-icon" @click="goHome">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 20v-6h4v6m7-7-9-9-9 9V20h18v-7z"></path>
      </svg>
    </div>

    <div class="register-card">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>

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
          Register
        </button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <div class="login-link">
        <p>Already have an account?</p>
        <a href="/login">Login here</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      try {
        if (!this.username || !this.email || !this.password) {
          this.errorMessage = 'All fields are required!';
          return;
        }

        this.errorMessage = '';

        const response = await axios.post('http://localhost:4001/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        alert('Registration successful!');
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data.error || 'Registration failed!';
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
.register-container {
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

.register-card {
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.register-card h2 {
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
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #218838;
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

.login-link {
  margin-top: 1.5rem;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
