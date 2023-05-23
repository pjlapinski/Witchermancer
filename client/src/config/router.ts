import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/pages/HomePage.vue'
import CreateCharacter from '@/components/pages/CreateCharacter.vue'
import CharacterSheet from '@/components/pages/CharacterSheet.vue'

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
  {
    path: '/char/:id',
    name: 'CharacterSheet',
    component: CharacterSheet,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home',
    },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
