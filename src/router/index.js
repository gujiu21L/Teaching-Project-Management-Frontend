import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Teachers from '../views/Teachers.vue';
import Students from '../views/Students.vue';
import Projects from '../views/Projects.vue';
import Participation from '../views/Participation.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/teachers', component: Teachers },
  { path: '/students', component: Students },
  { path: '/projects', component: Projects },
  { path: '/participation', component: Participation },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
