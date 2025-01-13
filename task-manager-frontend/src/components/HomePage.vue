<template>
  <div class="home-container">
    <!-- Header Section -->
    <Header />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Your Task Management Dashboard</h1>
        <p>
          Simplify your workflow, stay organized, and boost productivity with our easy-to-use tools.
        </p>
        <button class="primary-button" @click="navigateToTaskManagement">
          Get Started
        </button>
      </div>
      <img src="/assets/images/cover.jpeg" alt="Hero Image" class="hero-image" />
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <h2>How It Works</h2>
      <p>
        Our platform simplifies task management with intuitive tools for task creation, tracking, and team collaboration.
      </p>
      <div class="steps">
        <div class="step">
          <img src="/assets/images/2.png" alt="Create Tasks" />
          <h3>Create</h3>
          <p>Create tasks with details, priorities, and deadlines.</p>
        </div>
        <div class="step">
          <img src="/assets/images/3.png" alt="Track Progress" />
          <h3>Track</h3>
          <p>Monitor progress and stay updated with real-time changes.</p>
        </div>
        <div class="step">
          <img src="/assets/images/6.png" alt="Collaborate" />
          <h3>Collaborate</h3>
          <p>Work with your team seamlessly to achieve goals.</p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Features</h2>
      <div class="feature-cards">
        <div class="card">
          <img src="/assets/images/tasktracking.jpeg" alt="Task Management" />
          <h3>Task Management</h3>
          <p>Create, organize, and manage tasks effortlessly.</p>
        </div>
        <div class="card">
          <img src="/assets/images/7.png" alt="Real-Time Tracking" />
          <h3>Real-Time Updates</h3>
          <p>Get instant updates on task progress and deadlines.</p>
        </div>
        <div class="card">
          <img src="/assets/images/5.webp" alt="Team Collaboration" />
          <h3>Team Collaboration</h3>
          <p>Share tasks and work together efficiently.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <h2>What Our Users Say</h2>
      <div class="testimonial-cards">
        <div class="testimonial">
          <p>"This platform revolutionized how I manage my work. Highly recommend!"</p>
          <span>- John Doe</span>
        </div>
        <div class="testimonial">
          <p>"A seamless and efficient tool for staying on top of projects."</p>
          <span>- Jane Smith</span>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  methods: {
    navigateToTaskManagement() {
      this.$router.push({ name: 'TaskList' });
    },
  },
};
</script>

<style scoped>
.home-container {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background: linear-gradient(135deg, #36587c, #00c6ff);
  color: white;
}

.hero-content {
  max-width: 50%;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.hero-image {
  max-width: 40%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.primary-button {
  padding: 15px 30px;
  background-color: #fff;
  color: #007bff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}

.primary-button:hover {
  background-color: #00c6ff;
  transform: scale(1.1);
}

/* How It Works Section */
.how-it-works {
  text-align: center;
  padding: 50px;
  background: #f9f9f9;
}

.how-it-works .steps {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

.how-it-works .step {
  max-width: 300px;
  text-align: center;
}

.how-it-works .step img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.how-it-works h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.how-it-works p {
  font-size: 1rem;
  line-height: 1.5;
}

/* Features Section */
.features {
  padding: 50px;
  background: #fff;
  text-align: center;
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-align: center;
}

.card:hover {
  transform: translateY(-10px);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card p {
  font-size: 1rem;
  line-height: 1.5;
}

/* Testimonials Section */
.testimonials {
  padding: 50px;
  background: linear-gradient(135deg, #36587c, #00c6ff);
  color: white;
  text-align: center;
}

.testimonial-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.testimonial {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  font-style: italic;
}

.testimonial span {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  color: #ffe;
}
</style>
