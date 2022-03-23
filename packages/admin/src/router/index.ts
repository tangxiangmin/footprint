import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/meta/index.vue')
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/meta/page.vue')
  },
  {
    path: '/event_list',
    name: 'eventList',
    component: () => import('../views/meta/eventList.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
