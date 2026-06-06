import 'intersection-observer' // IntersectionObserver polyfill
import { getCurrentTrackTask } from '@footprintjs/sdk-core'

type LogElement = HTMLElement & {
  __logValue: any
  __exposureTimer: any
  __once: boolean
  __reported: boolean
}
/**
 * 曝光规则
 * 1. 停留100ms
 * 2. 单个容器可重复曝光
 */
const EXPOSURE_DURATION = 100

let observer: IntersectionObserver | undefined

// 惰性初始化：任何消费方（vue2/vue3）只要用到曝光指令就自动建好 observer，
// 不再依赖各自的 VueLogPlugin 记得调用 initObserver（这是之前 vue3 曝光不上报的根因）。
function ensureObserver() {
  if (!observer && typeof window !== 'undefined') {
    initObserver()
  }
  return observer
}

export function initObserver() {
  if (observer) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as LogElement
        if (target.__reported) {
          return
        }
        if (entry.isIntersecting) {
          // 进入视图触发
          try {
            const { key, extend, extra } = target.__logValue
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
      threshold: 0.2, // 目标dom出现在视图的比例 0 - 1，设置过大可能导致部分超长元素不会触发上报
    }
  )
}

function clickDirective(el: HTMLElement) {
  const task = getCurrentTrackTask() // 当前dom节点所在的页面
  el.addEventListener('click', () => {
    // @ts-ignore
    const { key, extend, extra } = el.__logValue
    task.trackClick(key, extend, extra)
  })
}

// 延迟到元素真正挂进文档后再 observe。
// directive 走 beforeMount 触发，此刻 el.isConnected === false；
// 普通元素同一 tick 内插入文档，IntersectionObserver 仍能补上首次检测，
// 但 teleport 内容（tippy/弹层）在展示前一直脱离文档，observe 落空 → 永不曝光。
// 用一个自我销毁的 MutationObserver 等元素连进文档再 observe，无内容时不常驻。
const pendingExposure = new Set<HTMLElement>()
let connectObserver: MutationObserver | undefined

function flushPendingExposure() {
  const ob = ensureObserver()
  pendingExposure.forEach((el) => {
    if (el.isConnected) {
      ob?.observe(el)
      pendingExposure.delete(el)
    }
  })
  if (pendingExposure.size === 0 && connectObserver) {
    connectObserver.disconnect()
    connectObserver = undefined
  }
}

function observeWhenConnected(el: HTMLElement) {
  if (el.isConnected) {
    ensureObserver()?.observe(el)
    return
  }
  pendingExposure.add(el)
  if (!connectObserver && typeof MutationObserver !== 'undefined') {
    connectObserver = new MutationObserver(flushPendingExposure)
    connectObserver.observe(document.body, { childList: true, subtree: true })
  }
}

function exposureDirective(el: HTMLElement) {
  const init = () => {
    observeWhenConnected(el)
  }

  // 图片需要等待加载完毕再进行曝光
  if (el.tagName.toLocaleLowerCase() === 'img') {
    el.addEventListener('load', init)
  } else {
    init()
  }
}

function update(el: HTMLElement, binding: { value: any }) {
  // @ts-ignore
  el.__logValue = binding.value
}

function unbind(el: HTMLElement) {
  pendingExposure.delete(el)
  observer?.unobserve(el)
}

// 使用方式 v-log.click.exposure
export const log = {
  bind(el: LogElement, binding: { value: any; modifiers: any }) {
    const { modifiers } = binding
    const { click, exposure, once } = modifiers
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
  unbind,
}

export const VueLogPlugin = {
  install(Vue: any) {
    if (typeof window !== 'undefined') {
      initObserver()
    }
    Vue.directive('log', log) // v-log.click、v-log.exposure
  },
}
