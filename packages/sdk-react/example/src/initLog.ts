import {init, sendBeacon} from "../../src/index";
import {routes, route404} from './router'
import {matchRoutes} from "react-router-dom";

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
      eventTime: +new Date()
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

