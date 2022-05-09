import {getCurrentTrackTask,} from "@footprint/sdk-core";
import {onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";

export * from "@footprint/sdk-core"

export function useTrackTask(extend: object = {}, extra: object = {}) {

  let task = getCurrentTrackTask()
  task.setCommonExtend(extend)
  task.setCommonExtra(extra)

  const route = useRoute()
  const {pv, async, duration} = route.meta.log as any

  const startTime = +new Date()

  function reportPv() {
    if (pv && !async) {
      task.trackPv()
    }
  }

  function reportDuration() {
    if (duration) {
      let val = +new Date() - startTime
      task.trackDuration(val)
    }
  }

  onMounted(() => {
    reportPv()
    window.addEventListener('unload', reportDuration)
  })

  onUnmounted(() => {
    reportDuration()
    window.removeEventListener('unload', reportDuration)
  })
}
