import Router from 'vue-router'
import {injectLogMixin} from "../../../src";

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
    component: injectLogMixin(() => import('../views/index.vue')),
    meta: {
      log: createLogParams('index')
    }
  },
  {
    path: '/list',
    name: 'list',
    component: injectLogMixin(() => import('../views/list.vue')),
    meta: {
      log: createLogParams('list')
    }
  },
  {
    path: '/detail/:id',
    name: 'detailPage',
    component: injectLogMixin(() => import('../views/detail.vue')),
    meta: {
      log: createLogParams('detailPage')
    }
  },
]

export default new Router({
  routes
})
