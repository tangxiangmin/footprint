// @ts-ignore
import { useEffect } from 'react'
import { getCurrentTrackTask, getCurrentRoute } from '@footprintjs/sdk-core'

export * from '@footprintjs/sdk-core'

// 路由组件每次变化或更新都处理处理上报
export function useTrackTask(extend: object = {}, extra: object = {}) {
  useEffect(() => {
    const task = getCurrentTrackTask()
    task.setCommonExtend(extend)
    task.setCommonExtra(extra)

    const route = getCurrentRoute()
    const { pv, async, duration } = route.meta.log as any

    const startTime = +new Date()

    function reportPv() {
      if (pv && !async) {
        task.trackPv()
      }
    }

    function reportDuration() {
      if (duration) {
        const val = +new Date() - startTime
        task.trackDuration(val)
      }
    }

    reportPv()

    window.addEventListener('unload', reportDuration)

    return () => {
      reportDuration()
      window.removeEventListener('unload', reportDuration)
    }
  }, [extend, extra])
}
