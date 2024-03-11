import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/meta/page_list',
  },
  // 元数据管理
  {
    path: '/meta/page_list',
    name: 'home',
    component: () => import('../views/meta/pageList.vue'),
  },
  {
    path: '/meta/page',
    name: 'page',
    component: () => import('../views/meta/page.vue'),
  },
  {
    path: '/meta/event_list',
    name: 'eventList',
    component: () => import('../views/meta/eventList.vue'),
  },
  {
    path: '/meta/event',
    name: 'event',
    component: () => import('../views/meta/event.vue'),
  },
  {
    path: '/meta/trace_params',
    name: 'traceParams',
    component: () => import('../views/meta/traceParams.vue'),
  },
  {
    path: '/meta/search',
    name: 'search',
    component: () => import('../views/meta/search.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
