import { describe, expect, it, vi } from 'vitest'
import { EVENT_TYPE } from './report'
import {
  TrackPageTask,
  getCurrentTrackTask,
  getPageTrackTask,
  initPageTrackTask,
} from './trackTask'

describe('TrackPageTask', () => {
  it('register 后 trackExposure 透传 page / 公共 extend / 局部参数', () => {
    const sendLog = vi.fn()
    const route = { name: 'list', meta: { log: { name: 'list' } } }
    TrackPageTask.register({ sendLog, getCurrentRoute: () => route })

    const task = getCurrentTrackTask()
    task.setCommonExtend({ uid: 7 })
    task.trackExposure('card', { idx: 1 }, { t: 'x' })

    expect(sendLog).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 'list',
        eventType: EVENT_TYPE.exposure,
        eventValue: 'card',
        uid: 7,
        idx: 1,
        extra: { t: 'x' },
      })
    )
  })

  it('同一路由对象复用同一 task 单例', () => {
    const route = { name: 'a', meta: { log: {} } }
    expect(getPageTrackTask(route)).toBe(initPageTrackTask(route))
  })

  it('mergeCommonParams 合并 page 与局部覆盖', () => {
    const task = new TrackPageTask('detail')
    task.setCommonExtend({ a: 1 })
    const merged = task.mergeCommonParams({ a: 2, b: 3 }, { k: 'v' })
    expect(merged).toEqual({
      extend: { page: 'detail', a: 2, b: 3 },
      extra: { k: 'v' },
    })
  })
})
