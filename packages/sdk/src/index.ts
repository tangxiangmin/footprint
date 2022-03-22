import {TrackPageTask} from './trackTask'

export {VueLogPlugin, injectLogMixin} from "./vue"

export {getCurrentTrackTask} from './trackTask'

type InitParams = {
  reportGetApi: string,
  reportPostApi: string,
  getCommonLogParams: Function,
  getCurrentRoute: Function
}

// 初始化
export async function init(params: InitParams) {
  const {
    reportGetApi,
    reportPostApi,
    getCommonLogParams,
    getCurrentRoute,
  } = params

  TrackPageTask.register({
    reportGetApi,
    reportPostApi,
    getCommonLogParams,
    getCurrentRoute
  })
}
