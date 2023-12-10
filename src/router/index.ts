import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerView from '../views/PlayerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/player/:tag',
      name: 'player',
      // component: () => import('../views/PlayerView.vue')
      component: PlayerView
    }
  ]
})

export default router
