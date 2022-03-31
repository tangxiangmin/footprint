import {EVENT_TYPE, initTrackLog} from "./report";

function getPageName(route) {
  const {log: logConfig} = route.meta
  return (logConfig && logConfig.name) || route.name
}

function noop() {
}

// 每个页面的上报任务
export class TrackPageTask {
  static trackLog: Function = noop
  static getCurrentRoute: Function = noop

  static register({sendLog, getCurrentRoute}) {
    TrackPageTask.trackLog = initTrackLog({sendLog})

    TrackPageTask.getCurrentRoute = getCurrentRoute
  }

  page: string
  extra: object
  extend: object
  isPageReady: boolean

  constructor(page) {
    this.page = page
    this.extra = {}
    this.extend = {}
    this.isPageReady = false
  }

  getCommonParams() {
    const {extend, extra} = this
    return {extend, extra}
  }

  setCommonExtend(extend) {
    this.extend = extend
  }

  setCommonExtra(extra) {
    this.extra = extra
  }

  mergeCommonParams(e1, e2) {
    // 处理一些全局参数
    const {page, extend, extra} = this
    const mergedExtend = {page, ...extend, ...e1}
    const mergeExtra = {...extra, ...e2}

    return {
      extend: mergedExtend,
      extra: mergeExtra
    }
  }

  track(eventType, eventValue, e1 = {}, e2 = {}) {
    if (!TrackPageTask.trackLog) return
    const {extend, extra} = this.mergeCommonParams(e1, e2)
    return TrackPageTask.trackLog(this.page, eventType, eventValue, extend, extra)
  }

  trackPv(extend, extra) {
    this.track(EVENT_TYPE.pv, '', extend, extra)
  }

  trackExposure(key, extend, extra) {
    this.track(EVENT_TYPE.exposure, key, extend, extra)
  }

  trackClick(key, extend, extra) {
    this.track(EVENT_TYPE.click, key, extend, extra)
  }

  trackLogic(key, extend, extra) {
    this.track(EVENT_TYPE.logic, key, extend, extra)
  }

  trackDuration(eventVal, extend, extra) {
    this.track(EVENT_TYPE.duration, eventVal, extend, extra)
  }

  pageReady(extend, extra) {
    if (this.isPageReady) return
    this.trackPv(extend, extra)
  }
}

const factory = {
  map: new Map(),
  setPageTrackTask(route, task) {
    this.map.set(route, task)
  },
  getPageTrackTask(route) {
    return this.map.get(route)
  },
  removePageTrackTask(route) {
    this.map.delete(route)
  }
}

export function initPageTrackTask(route) {
  const page = getPageName(route)
  // 同一个路由页面使用单例
  let task = factory.getPageTrackTask(route)
  if (!task) {
    task = new TrackPageTask(page)
    factory.setPageTrackTask(route, task)
  }
  return task
}

export function getPageTrackTask(route) {
  const task = factory.getPageTrackTask(route)
  if (task) return task
  return initPageTrackTask(route)
}

// 获取当前页面的埋点任务
export function getCurrentTrackTask() {
  const route = TrackPageTask.getCurrentRoute()
  return getPageTrackTask(route)
}

export function removePageTrackTask() {
  const route = TrackPageTask.getCurrentRoute()
  factory.removePageTrackTask(route)
}
