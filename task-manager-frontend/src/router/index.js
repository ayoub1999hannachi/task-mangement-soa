import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import ProjectList from '../components/ProjectList.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import NotFound from '../components/NotFound.vue';
import HomePage from '../components/HomePage.vue';
import TaskDetails from '../components/TaskDetails.vue'; // Import the HomePage component

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage, // Add HomePage component here
    meta: { title: 'Home' },
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList,
    meta: { title: 'Task List' },
    meta: { requiresAuth: true},
  },
  {
    path: "/task/:taskId",
    name: "TaskDetails",
    component: TaskDetails,
    meta: { requiresAuth: true},
  },
  
  {
    path: '/projects',
    name: 'ProjectList',
    component: ProjectList,
    meta: { requiresAuth: true, title: 'Project List' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Register' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, title: 'Profile' },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Task Manager App';

  // Redirect authenticated users away from login/register pages
  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated()) {
    next('/');  // Redirect to Home page if already logged in
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated()) {
    next('/login');  // Redirect to login if the page requires authentication and the user is not authenticated
  } else {
    next();  // Proceed as normal
  }
});

export default router;
