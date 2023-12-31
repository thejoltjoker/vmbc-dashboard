import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerView from '../views/PlayerView.vue'
import ViewSandbox from '../views/ViewSandbox.vue'

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
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: ViewSandbox
    },
    {
      path: '/event/:id',
      name: 'event',
      component: () => import('../views/ViewEvent.vue')
    },
    {
      path: '/brawler/:id',
      name: 'brawler',
      component: () => import('../views/ViewBrawler.vue')
    }
  ]
})

export default router
