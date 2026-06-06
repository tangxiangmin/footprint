---
'@footprintjs/sdk-vue': patch
'@footprintjs/sdk-vue3': patch
'@footprintjs/sdk-vue2': patch
---

fix(exposure): 曝光 IntersectionObserver 改为惰性自初始化

此前 vue3 消费方的 `VueLogPlugin` 只注册了指令，从未调用 `initObserver()`，
导致模块级 `observer` 为 `undefined`，`observer?.observe()` 静默空跑，曝光永不上报。
现在任何消费方一旦使用曝光指令即自动建好 observer，无需手动调用 `initObserver`。
