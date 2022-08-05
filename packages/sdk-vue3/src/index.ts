import {getCurrentTrackTask,} from "@footprint/sdk-core";
import {computed, onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";
import {log} from "@footprint/sdk-vue"

export * from "@footprint/sdk-core"

const defaultPluginOptions = {
  directiveName: 'log'
}

export const VueLogPlugin = {
  install(app, options = defaultPluginOptions) {
    app.directive(options.directiveName, {
      beforeMount: log.bind,
      updated: log.componentUpdated,
      unmounted: log.unbind
    })
  }
}

export function useTrackTask(extend: object = {}, extra: object = {}) {

  let task = getCurrentTrackTask()
  task.setCommonExtend(extend)
  task.setCommonExtra(extra)

  const route = useRoute()

  const startTime = +new Date()

  const logMeta = computed(() => {
    if (!route) return {}
    return route.meta.log as any
  })

  function reportPv() {
    const {pv, async} = logMeta.value
    if (pv && !async) {
      task.trackPv()
    }
  }

  function reportDuration() {
    const {duration} = logMeta.value
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
