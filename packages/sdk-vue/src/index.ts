import 'intersection-observer' // IntersectionObserver polyfill
import {getCurrentTrackTask} from "@footprintjs/sdk-core";

type LogElement = Element & {
  __logValue: any,
  __exposureTimer: any,
  __once: boolean,
  __reported: boolean
}
/**
 * 曝光规则
 * 1. 停留100ms
 * 2. 单个容器可重复曝光
 */
const EXPOSURE_DURATION = 100
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const target = entry.target as LogElement
      if (target.__reported) {
        return
      }
      if (entry.isIntersecting) {
        // 进入视图触发
        try {
          const {key, extend, extra} = target.__logValue
          const trackTask = getCurrentTrackTask()
          // 在视图内停留超过一定时间再上报
          target.__exposureTimer = setTimeout(() => {
            // 页面可见时才上报
            if (document.visibilityState === 'visible') {
              trackTask.trackExposure(key, extend, extra)
            }
            if (target.__once) {
              target.__reported = true
            }
          }, EXPOSURE_DURATION)
        } catch (err) {
          console.log(err)
        }
      } else {
        clearTimeout(target.__exposureTimer)
        target.__exposureTimer = null
      }
    })
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // 目标dom出现在视图的比例 0 - 1，设置过大可能导致部分超长元素不会触发上报
  }
)

function clickDirective(el) {
  const task = getCurrentTrackTask() // 当前dom节点所在的页面
  el.addEventListener('click', () => {
    const {key, extend, extra} = el.__logValue
    task.trackClick(key, extend, extra)
  })
}

function exposureDirective(el) {
  const init = () => {
    observer.observe(el)
  }

  // 图片需要等待加载完毕再进行曝光
  if (el.tagName.toLocaleLowerCase() === 'img') {
    el.addEventListener('load', init)
  } else {
    init()
  }
}

function update(el, binding) {
  el.__logValue = binding.value
}

function unbind(el) {
  observer.unobserve(el)
}

// 使用方式 v-log.click.exposure
export const log = {
  bind(el: LogElement, binding) {
    const {modifiers} = binding
    const {click, exposure, once} = modifiers
    el.__logValue = binding.value
    el.__once = once

    if (click) {
      clickDirective(el)
    }

    if (exposure) {
      exposureDirective(el)
    }
  },
  componentUpdated: update,
  unbind
}


export const VueLogPlugin = {
  install(Vue) {
    Vue.directive('log', log) // v-log.click、v-log.exposure
  }
}
