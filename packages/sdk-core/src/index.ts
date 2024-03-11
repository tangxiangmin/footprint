import { TrackPageTask } from './trackTask'

export {
  getCurrentTrackTask,
  getPageTrackTask,
  getCurrentRoute,
  initPageTrackTask,
  removePageTrackTask,
} from './trackTask'
export { EVENT_TYPE, sendBeacon, sendPxPoint } from './report'

type InitParams = {
  getCurrentRoute: Function
  sendLog: (data: any) => void
}

// 初始化
export function init(params: InitParams) {
  const { getCurrentRoute, sendLog } = params

  return TrackPageTask.register({
    getCurrentRoute,
    sendLog,
  })
}
