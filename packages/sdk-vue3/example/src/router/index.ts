import {createRouter, createWebHistory} from "vue-router";

const createLogParams = (name: string = '', pv = true, duration = false, async = false) => ({
  name,
  pv,
  duration,
  async
})
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      log: createLogParams('index')
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list.vue'),
    meta: {
      log: createLogParams('list')
    }
  },
  {
    path: '/detail/:id',
    name: 'detailPage',
    component: () => import('../views/detail.vue'),
    meta: {
      log: createLogParams('detailPage')
    }
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
