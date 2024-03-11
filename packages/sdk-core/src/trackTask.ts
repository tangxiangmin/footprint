import { EVENT_TYPE, EventValue, initTrackLog } from './report'

type Route = { meta: { log: any }; name?: string }
type ExtendData = any
type ExtraData = any

function getPageName(route: { meta: { log: any }; name?: string }) {
  if (!route) return {}
  const { log: logConfig } = route.meta || {}
  return (logConfig && logConfig.name) || route.name
}

function noop() {
  // noop
}

// 每个页面的上报任务
export class TrackPageTask {
  static trackLog: Function = noop

  static getCurrentRoute: Function = noop

  static register({ sendLog, getCurrentRoute }: { sendLog: Function; getCurrentRoute: Function }) {
    TrackPageTask.trackLog = initTrackLog({ sendLog })

    TrackPageTask.getCurrentRoute = getCurrentRoute
  }

  page: string

  extra: object

  extend: object

  isPageReady: boolean

  constructor(page: string) {
    this.page = page
    this.extra = {}
    this.extend = {}
    this.isPageReady = false
  }

  getCommonParams() {
    const { extend, extra } = this
    return { extend, extra }
  }

  setCommonExtend(extend: ExtendData) {
    this.extend = {
      ...this.extend,
      ...extend,
    }
  }

  setCommonExtra(extra: ExtraData) {
    this.extra = {
      ...this.extra,
      ...extra,
    }
  }

  mergeCommonParams(e1: ExtendData, e2: ExtraData) {
    // 处理一些全局参数
    const { page, extend, extra } = this
    const mergedExtend = { page, ...extend, ...e1 }
    const mergeExtra = { ...extra, ...e2 }

    return {
      extend: mergedExtend,
      extra: mergeExtra,
    }
  }

  track(eventType: EVENT_TYPE, eventValue: EventValue, e1 = {}, e2 = {}) {
    if (!TrackPageTask.trackLog) return
    const { extend, extra } = this.mergeCommonParams(e1, e2)
    return TrackPageTask.trackLog(this.page, eventType, eventValue, extend, extra)
  }

  trackPv(extend?: ExtendData, extra?: ExtraData) {
    this.track(EVENT_TYPE.pv, '', extend, extra)
  }

  trackExposure(key: string, extend?: ExtendData, extra?: ExtraData) {
    this.track(EVENT_TYPE.exposure, key, extend, extra)
  }

  trackClick(key: string, extend?: ExtendData, extra?: ExtraData) {
    this.track(EVENT_TYPE.click, key, extend, extra)
  }

  trackLogic(key: string, extend?: ExtendData, extra?: ExtraData) {
    this.track(EVENT_TYPE.logic, key, extend, extra)
  }

  trackDuration(eventVal: number, extend?: ExtendData, extra?: ExtraData) {
    this.track(EVENT_TYPE.duration, eventVal, extend, extra)
  }

  pageReady(extend: ExtendData, extra: ExtraData) {
    if (this.isPageReady) return
    this.trackPv(extend, extra)
  }
}

const map = new Map()

export function initPageTrackTask(route: Route) {
  // 同一个路由页面使用单例
  let task = map.get(route)
  if (!task) {
    const page = getPageName(route)
    task = new TrackPageTask(page)
    map.set(route, task)
  }
  return task
}

export function getPageTrackTask(route: Route) {
  const task = map.get(route)
  if (task) return task
  return initPageTrackTask(route)
}

// 获取当前页面的埋点任务
export function getCurrentTrackTask() {
  const route = getCurrentRoute()
  return getPageTrackTask(route)
}

export function removePageTrackTask() {
  const route = getCurrentRoute()
  map.delete(route)
}

export function getCurrentRoute() {
  return TrackPageTask.getCurrentRoute()
}
