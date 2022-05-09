import {TrackPageTask} from './trackTask'

export {getCurrentTrackTask, getPageTrackTask, getCurrentRoute} from './trackTask'
export {EVENT_TYPE, sendBeacon, sendPxPoint} from './report'

type InitParams = {
  getCurrentRoute: Function,
  sendLog: (data: any) => void,
}

// 初始化
export async function init(params: InitParams) {
  const {
    getCurrentRoute,
    sendLog
  } = params

  TrackPageTask.register({
    getCurrentRoute,
    sendLog
  })
}
