// @ts-nocheck
import { initPageTrackTask, removePageTrackTask, getCurrentTrackTask } from '../trackTask'

// 路由级别的组件可以上报pv和停留事件
export default {
  data() {
    return {
      _pageReady: false
    }
  },
  computed: {
    logConfig() {
      return this.$route.meta.log
    }
  },
  beforeRouteEnter(to, from, next) {
    initPageTrackTask(to)
    next(vm => {
      vm.$$enterTime = +new Date()
      const { log: logConfig } = vm.$route.meta
      if (logConfig && !logConfig.async) {
        // 异步埋点需要等待自己打点
        vm._trackPvLog()
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    this._trackDurationLog()
    removePageTrackTask()

    next()

    initPageTrackTask(to)

    const { log: logConfig } = this.$route.meta
    if (logConfig && !logConfig.async) {
      this._trackPvLog()
    }
  },
  beforeRouteLeave(to, from, next) {
    this._trackDurationLog()
    removePageTrackTask()

    next()
  },
  // 页面卸载时处理停留埋点
  mounted() {
    window.addEventListener('unload', this._trackDurationLog)
  },
  beforeDestroy() {
    window.removeEventListener('unload', this._trackDurationLog)
  },
  // 路由组件声明公共公共参数，非路由组件使用task.setCommonExtend和task.setCommonExtra
  watch: {
    _logExtend: {
      immediate: true,
      handler(newVal) {
        const task = getCurrentTrackTask()
        task.setCommonExtend(newVal)
      }
    },
    _logExtra: {
      immediate: true,
      handler(newVal) {
        const task = getCurrentTrackTask()
        task.setCommonExtra(newVal)
      }
    }
  },
  methods: {
    // pv埋点
    _trackPvLog() {
      const { logConfig } = this
      if (!logConfig || !logConfig.pv) return

      const task = getCurrentTrackTask()
      task.trackPv(this._logExtend, this._logExtra)
    },
    // 页面停留埋点，计算页面停留时间
    _trackDurationLog() {
      const { logConfig } = this
      if (!logConfig || !logConfig.duration) return

      const now = +new Date()
      const time = now - this.$$enterTime

      const task = getCurrentTrackTask()
      task.trackDuration(time, this._logExtend, this._logExtra)

      this.$$enterTime = now
    },
    // 等待页面准备完毕后再通知埋点
    onPageReady() {
      this._pageReady = true
      this._trackPvLog()
    }
  }
}
