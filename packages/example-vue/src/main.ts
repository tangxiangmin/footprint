import {createApp} from 'vue'
import {init, sendBeacon} from "@footprint/sdk";

import App from './App.vue'


async function initLog() {

  const host = 'http://localhost:1546'
  const reportPostApi = `${host}/log/report`

  const getCurrentRoute = () => {
    return {
      name: 'home',
      meta: {
        log: {
          pv: true
        }
      }
    }
    // return router.currentRoute
  }

  const sendLog = (data: any) => {
    console.log(data)
    data = {
      ...data,
      eventTime: +new Date()
    }
    data.extra = JSON.stringify(data.extra)
    return sendBeacon(reportPostApi, data)
  }

  await init({
    sendLog,
    getCurrentRoute,
  })
}


initLog()

createApp(App).mount('#app')
