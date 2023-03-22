export * from "@footprintjs/sdk-core"
export * from "@footprintjs/sdk-vue"

import logMixin from './mixin'

// 向路由组件混入埋点数据，避免二级目录埋点异常
export const injectLogMixin = routeComponent => {
  const mixin = component => {
    if (!Array.isArray(component.mixins)) {
      component.mixins = []
    }
    component.mixins.push(logMixin)
    return component
  }
  // 处理异步组件
  if (typeof routeComponent === 'function') {
    const origin = routeComponent
    return () => {
      return origin().then(ans => {
        return mixin(ans.default)
      })
    }
  }
  return mixin(routeComponent)
}
