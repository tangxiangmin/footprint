import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: '/page_list'
  },
  {
    path: '/page_list',
    name: 'home',
    component: () => import('../views/meta/pageList.vue')
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
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('../views/meta/event.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
