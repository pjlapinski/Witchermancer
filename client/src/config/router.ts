import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/pages/HomePage.vue'
import CreateCharacter from '@/components/pages/CreateCharacter.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/new',
    name: 'CreateCharacter',
    component: CreateCharacter,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
