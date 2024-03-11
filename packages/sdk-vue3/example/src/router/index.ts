import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '../views/index.vue'
import { trackTaskHoc } from '../../../src/hoc'

const createLogParams = (name = '', pv = true, duration = false, async = false) => ({
  name,
  pv,
  duration,
  async,
})
const routes = [
  {
    path: '/',
    name: 'index',
    component: trackTaskHoc(IndexPage),
    meta: {
      log: createLogParams('index'),
    },
  },
  {
    path: '/list',
    name: 'list',
    component: trackTaskHoc(() => import('../views/list.vue')),
    meta: {
      log: createLogParams('list'),
    },
  },
  {
    path: '/detail/:id',
    name: 'detailPage',
    component: () => import('../views/detail.vue'),
    meta: {
      log: createLogParams('detailPage'),
    },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
