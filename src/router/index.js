import { createRouter, createWebHistory } from 'vue-router'
import auth from './auth'
import main from './main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    auth,
    main
  ]
})

export default router
