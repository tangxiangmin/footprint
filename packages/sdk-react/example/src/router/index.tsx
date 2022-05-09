import Home from '../views/Home'
import List from '../views/List'
import Detail from '../views/Detail'

type RouteMeta = {
  requiresAuth?: boolean,
  log?: any
}

export type Route = {
  path: string,
  exact?: boolean,
  meta?: RouteMeta,
  name?: string,
  component: any
}

const createLogParams = (name: string = '', pv = true, duration = false, async = false) => ({
  name,
  pv,
  duration,
  async
})


export const route404 = {
  path: '/404',
  name: '404',
  component: () => {
    return (<div>404</div>)
  },
  exact: true,
  meta: {
    log: {
      pv: false
    }
  },
}
// 售卖页路由
const routeList: Array<Route> = [
  {
    path: '/',
    name: 'index',
    component: Home,
    exact: true,
    meta: {
      requiresAuth: false,
      log: createLogParams('index')
    },
  },
  {
    path: '/list',
    name: 'list',
    exact: true,
    component: List,
    meta: {
      requiresAuth: false,
      log: createLogParams('list')
    }
  },
  {
    path: '/detail/:id',
    exact: true,
    name: 'detailPage',
    component: Detail,
    meta: {
      requiresAuth: false,
      log: createLogParams('detailPage')
    }
  },
  route404
]

export const routes = routeList.map(row => {
  return row
})
