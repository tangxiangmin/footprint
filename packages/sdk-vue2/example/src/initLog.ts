import { init } from '../../src/index'
import router from './router'

export async function initLog() {
  // const host = 'http://localhost:1546'
  // const reportPostApi = `${host}/log/report`

  const getCurrentRoute = () => {
    return router.currentRoute
  }

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
