import {createWebHashHistory,createRouter } from 'vue-router'

// import HomeView from '../pages/home.vue';
import AboutView from '../pages/about.vue'

const routes = [
  { path: '/', component: AboutView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router