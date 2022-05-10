// @ts-nocheck
import {initPageTrackTask, removePageTrackTask, getCurrentTrackTask} from '@footprint/sdk-core'


// 路由级别的组件可以上报pv和停留事件
export default {
  computed: {
    logConfig() {
      return this.$route.meta.log
    }
  },
  beforeRouteEnter(to, from, next) {
    initPageTrackTask(to)
    next(vm => {
      vm.$$enterTime = +new Date()
      vm._trackPvLog()
    })
  },
  beforeRouteUpdate(to, from, next) {
    this._trackDurationLog()
    removePageTrackTask()

    next()

    initPageTrackTask(to)
    setTimeout(() => {
      this._trackPvLog()
    })
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
  methods: {
    // pv埋点
    _trackPvLog() {
      const {logConfig} = this
      if (!logConfig || !logConfig.pv || logConfig.async) return

      const task = getCurrentTrackTask()
      task.trackPv()
    },
    // 页面停留埋点，计算页面停留时间
    _trackDurationLog() {
      const {logConfig} = this
      if (!logConfig || !logConfig.duration) return

      const now = +new Date()
      const time = now - this.$$enterTime

      const task = getCurrentTrackTask()
      task.trackDuration(time)

      this.$$enterTime = now
    }
  }
}
