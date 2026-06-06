# @footprintjs/sdk-core

## 1.1.0

### Minor Changes

- 59f7ef0: 1.1.0：修复 vue3 曝光 observer 未初始化 + 工具链现代化

  - fix(exposure): 曝光 IntersectionObserver 改为惰性自初始化（ensureObserver），
    根治 vue3 消费方从不调用 initObserver 导致 observer 为 undefined、曝光永不上报的问题。
  - 构建迁移 tsup（ESM + CJS + d.ts），各包补 exports / publishConfig。
  - sdk-core 移除 url-search-params-polyfill。
  - 统一 scoped 包名（sdk-react → @footprintjs/sdk-react）。
