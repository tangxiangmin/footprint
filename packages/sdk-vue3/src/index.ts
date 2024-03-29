import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentTrackTask } from '@footprintjs/sdk-core'
import { log } from '@footprintjs/sdk-vue'

export * from '@footprintjs/sdk-core'

const defaultPluginOptions = {
  directiveName: 'log',
}

export const VueLogPlugin = {
  install(app: any, options = defaultPluginOptions) {
    app.directive(options.directiveName, {
      beforeMount: log.bind,
      updated: log.componentUpdated,
      unmounted: log.unbind,
    })
  },
}

const defaultMeta = {
  pv: false,
  duration: false,
  async: false,
}

export function useTrackTask(extend: object = {}, extra: object = {}) {
  const task = getCurrentTrackTask()
  task.setCommonExtend(extend)
  task.setCommonExtra(extra)

  const route = useRoute()

  const startTime = +new Date()

  const logMeta = computed(() => {
    if (!route) return defaultMeta
    if (!route.meta) return defaultMeta

    return (route.meta.log || defaultMeta) as {pv:boolean, duration:boolean, async:boolean}
  })

  function reportPv() {
    const { pv, async } = logMeta.value
    if (pv && !async) {
      task.trackPv()
    }
  }

  function reportDuration() {
    const { duration } = logMeta.value
    if (duration) {
      const val = +new Date() - startTime
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
