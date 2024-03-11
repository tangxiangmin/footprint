import logMixin from './mixin'

export * from '@footprintjs/sdk-core'
export * from '@footprintjs/sdk-vue'

// 向路由组件混入埋点数据，避免二级目录埋点异常
export const injectLogMixin = (routeComponent: any) => {
  const mixin = (component: any) => {
    if (!Array.isArray(component.mixins)) {
      component.mixins = []
    }
    component.mixins.push(logMixin)
    return component
  }
  // 处理异步组件
  if (typeof routeComponent === 'function') {
    const origin = routeComponent
    return () => origin().then((ans: { default: any }) => mixin(ans.default))
  }
  return mixin(routeComponent)
}
