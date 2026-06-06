import { init, sendBeacon } from '../../src/index'
import router from './router'

export async function initLog() {
  // const host = 'http://localhost:1546'
  // const reportPostApi = `${host}/log/report`

  const getCurrentRoute = () => {
    return router.currentRoute.value
  }

  const sendLog = (data: any) => {
    data = {
      ...data,
      eventTime: +new Date(),
    }
    data.extra = JSON.stringify(data.extra)

    console.log('send log', data)
    // 派发到全局，demo 页面可监听并在屏幕上展示上报记录
    window.dispatchEvent(new CustomEvent('footprint-log', { detail: data }))
    // return sendBeacon(reportPostApi, data)
  }

  await init({
    sendLog,
    getCurrentRoute,
  })
}
