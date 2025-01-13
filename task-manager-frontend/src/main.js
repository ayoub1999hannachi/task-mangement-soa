import { createApp } from 'vue'; // Vue 3
import App from './App.vue'; // Your root component
import router from './router';
import vuetify from './plugins/vuetify';  // Vuetify plugin

createApp(App)
  .use(router)  // Use Vue Router
  .use(vuetify) // Use Vuetify
  .mount('#app'); // Mount the app to the DOM
