import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/meta.vue')
  },
  {
    path: '/meta',
    name: 'meatConfig',
    component: () => import('../views/meta.vue')
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
