import {createApp} from 'vue'
import {init, getCurrentTrackTask} from "@footprint/sdk";

import App from './App.vue'


async function initLog() {

  const host = 'http://localhost:1546'
  const reportGetApi = `${host}/log/report`
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

  const getCommonLogParams = () => {
    return {
      uuid: 'xxx'
    }
  }

  await init({
    reportGetApi,
    reportPostApi,
    getCommonLogParams,
    getCurrentRoute,
  })
}


initLog()

createApp(App).mount('#app')
