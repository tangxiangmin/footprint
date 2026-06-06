import { beforeEach, describe, expect, it, vi } from 'vitest'

// 捕获 IntersectionObserver 的回调，手动驱动「进入/离开视口」
let ioCallback: (entries: any[]) => void

class MockIntersectionObserver {
  constructor(cb: (entries: any[]) => void) {
    ioCallback = cb
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true })
}

describe('v-log.exposure 指令', () => {
  let log: any
  let sendLog: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    vi.resetModules()
    vi.useFakeTimers()
    setVisibility('visible')

    // 先放好 mock，使 intersection-observer polyfill 探测到「已存在」而跳过
    // @ts-expect-error 测试环境注入
    global.IntersectionObserver = MockIntersectionObserver
    // @ts-expect-error 测试环境注入
    global.IntersectionObserverEntry = class {
      get intersectionRatio() {
        return 0
      }
    }

    const core = await import('@footprintjs/sdk-core')
    sendLog = vi.fn()
    core.init({
      sendLog,
      getCurrentRoute: () => ({ name: 'test', meta: { log: { name: 'test' } } }),
    })

    log = (await import('./index')).log
  })

  function mountExposureEl() {
    const el = document.createElement('div')
    document.body.appendChild(el)
    log.bind(el, {
      value: { key: 'k1', extend: {}, extra: {} },
      modifiers: { exposure: true },
    })
    return el
  }

  it('进入视口并停留 100ms 后上报曝光', () => {
    const el = mountExposureEl()
    ioCallback([{ target: el, isIntersecting: true }])

    // 未到停留阈值，不上报
    expect(sendLog).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(sendLog).toHaveBeenCalledTimes(1)
    expect(sendLog.mock.calls[0][0]).toMatchObject({ eventType: 4, eventValue: 'k1' })
  })

  it('停留不足 100ms 即离开视口不上报', () => {
    const el = mountExposureEl()
    ioCallback([{ target: el, isIntersecting: true }])
    vi.advanceTimersByTime(50)
    ioCallback([{ target: el, isIntersecting: false }])
    vi.advanceTimersByTime(100)
    expect(sendLog).not.toHaveBeenCalled()
  })

  it('页面不可见（visibilityState=hidden）时不上报', () => {
    const el = mountExposureEl()
    setVisibility('hidden')
    ioCallback([{ target: el, isIntersecting: true }])
    vi.advanceTimersByTime(100)
    expect(sendLog).not.toHaveBeenCalled()
  })
})
