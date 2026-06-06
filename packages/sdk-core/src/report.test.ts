import { describe, expect, it, vi } from 'vitest'
import { EVENT_TYPE, initTrackLog } from './report'

describe('report', () => {
  it('EVENT_TYPE 枚举值稳定（与后端约定一致）', () => {
    expect({ ...EVENT_TYPE }).toMatchObject({
      pv: 1,
      click: 2,
      duration: 3,
      exposure: 4,
      logic: 5,
    })
  })

  it('initTrackLog 组装上报数据并调用 sendLog', () => {
    const sendLog = vi.fn()
    const trackLog = initTrackLog({ sendLog })

    trackLog('home', EVENT_TYPE.exposure, 'banner', { page: 'home', a: 1 }, { b: 2 })

    expect(sendLog).toHaveBeenCalledTimes(1)
    expect(sendLog).toHaveBeenCalledWith({
      page: 'home',
      eventType: 4,
      eventValue: 'banner',
      a: 1,
      extra: { b: 2 },
    })
  })
})
