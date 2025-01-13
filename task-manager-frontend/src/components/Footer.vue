<template>
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-info">
          <p>&copy; 2025 Task Management. All rights reserved.</p>
          <p>Built with ❤️ for a more organized life.</p>
          <p>HANNACHI Ayoub | Email: <a href="mailto:ahannachi193@gmail.com" class="contact-link">ahannachi193@gmail.com</a> | Tel: 27495606</p>
        </div>
        <div class="footer-social">
          <a href="https://facebook.com" target="_blank" class="social-link">Facebook</a>
          <a href="https://twitter.com" target="_blank" class="social-link">Twitter</a>
          <a href="https://linkedin.com" target="_blank" class="social-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer"
  }
  </script>
  
  <style scoped>
  /* Footer Styles */
  .app-footer {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
  }
  
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-info p {
    margin: 0;
  }
  
  .contact-link {
    color: white;
    text-decoration: none;
  }
  
  .contact-link:hover {
    text-decoration: underline;
  }
  
  .footer-social {
    display: flex;
    gap: 15px;
  }
  
  .social-link {
    color: white;
    text-decoration: none;
    font-size: 1.1em;
  }
  
  .social-link:hover {
    text-decoration: underline;
  }
  </style>
  