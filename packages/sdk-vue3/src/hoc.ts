import { defineComponent, h, useAttrs } from 'vue'
import { useTrackTask } from './index'

export function trackTaskHoc(routeComponent: any) {
  function hoc(comp: any) {
    return defineComponent({
      setup() {
        const attrs = useAttrs()
        useTrackTask()
        return () => h(comp, {
          ...attrs,
        })
      },
    })
  }
  if (typeof routeComponent === 'function') {
    const origin = routeComponent
    return () => origin().then((ans: any) => hoc(ans.default))
  }
  return hoc(routeComponent)
}
