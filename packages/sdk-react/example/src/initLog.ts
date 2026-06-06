import { matchRoutes } from 'react-router-dom'
import { init, sendBeacon } from '../../src/index'
import { route404, routes } from './router'

export function getCurrentRoute() {
  // 获取当前路由对应的路由配置
  const [result] = matchRoutes(routes, window.location.pathname) || []
  if (!result || !result.route) return route404
  return result.route
}

export async function initLog() {
  // const reportPostApi = `http://localhost:1546/log/report`
  const sendLog = (data: any) => {
    data = {
      ...data,
      eventTime: +new Date(),
    }
    data.extra = JSON.stringify(data.extra)

    console.log('send log', data)
    // return sendBeacon(reportPostApi, data)
  }

  await init({
    sendLog,
    getCurrentRoute,
  })
}
