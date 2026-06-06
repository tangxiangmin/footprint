
footprint
===

一套前端埋点、元数据管理、数据查询的解决方案。

埋点 SDK 采用 pnpm monorepo + tsup 构建，覆盖 core / vue / vue2 / vue3 / react。

## 包结构

| 包 | 说明 |
| --- | --- |
| [`@footprintjs/sdk-core`](./packages/sdk-core) | 核心：页面任务、事件上报、公共参数 |
| [`@footprintjs/sdk-vue`](./packages/sdk-vue) | 通用指令层：`v-log` 点击 / 曝光指令（被 vue2/vue3 复用） |
| [`@footprintjs/sdk-vue2`](./packages/sdk-vue2) | Vue2 适配：路由 mixin + `v-log` |
| [`@footprintjs/sdk-vue3`](./packages/sdk-vue3) | Vue3 适配：`useTrackTask` + `v-log` |
| [`@footprintjs/sdk-react`](./packages/sdk-react) | React 适配：`useTrackTask` Hook |
| `packages/server` | 上报接收 / 元数据查询服务（Koa + Mongo） |
| `packages/admin` | 元数据管理后台 |

## 本地开发

要求 Node >= 18、pnpm 10。

```bash
pnpm install          # 安装依赖
pnpm dev              # 所有 SDK 包 tsup watch 并行构建
pnpm build            # 构建全部 SDK 包（ESM + CJS + d.ts）
pnpm test             # Vitest 跑全部单测
pnpm test:watch       # Vitest watch
pnpm lint             # Biome 检查
pnpm lint:fix         # Biome 自动修复
```

各 example 独立启动（vite 直接消费 SDK 源码，改源码即时热更）：

```bash
pnpm --filter example-vue dev     # Vue3 示例，含 /exposure 曝光验证页
pnpm --filter example-vue2 dev    # Vue2 示例
pnpm --filter example-react dev   # React 示例
```

服务端开发环境（Docker）：

```bash
docker-compose up -d
```

## SDK 快速使用（Vue3）

```ts
// main.ts
import { createApp } from 'vue'
import { VueLogPlugin } from '@footprintjs/sdk-vue3'
import { init } from '@footprintjs/sdk-core'

init({
  getCurrentRoute: () => router.currentRoute.value,
  sendLog: (data) => navigator.sendBeacon('/log/report', JSON.stringify(data)),
})

createApp(App).use(router).use(VueLogPlugin).mount('#app')
```

```vue
<template>
  <!-- 点击上报 -->
  <button v-log.click="{ key: 'buy', extend: {}, extra: {} }">购买</button>
  <!-- 曝光上报：元素进视口（≥20% 可见并停留 100ms）即上报，可加 .once 只报一次 -->
  <div v-log.exposure="{ key: 'banner', extend: {}, extra: {} }">广告位</div>
</template>

<script setup lang="ts">
import { useTrackTask } from '@footprintjs/sdk-vue3'
useTrackTask() // 处理页面 pv / 停留埋点
</script>
```

## 发布

使用 [changesets](https://github.com/changesets/changesets) 管理版本与发布：

```bash
pnpm changeset          # 交互式记录本次改动（选包 + 语义版本 + 说明）
pnpm version-packages   # 消费 changeset，升级版本号并生成 CHANGELOG
pnpm release            # 构建并 changeset publish 发布到 npm
```

CI（`.github/workflows`）：每次 push / PR 跑 lint + test + build；合入 master 后由
changesets 自动开「Version Packages」PR，合并该 PR 即发布。

## 事件

eventType表示某个事件的类型
```js
export const EVENT_TYPE = {
  pv: 1, // 访问
  click: 2, // 点击
  duration: 3, // 页面停留
  exposure: 4, // 元素曝光
  logic: 5 // 逻辑埋点
}
```

不同eventType对应的eventValue不同

| eventType | eventValue     |
| --------- | -------------- |
| 访问      | 无             |
| 点击      | 点击元素的名称 |
| 停留      | 停留时长       |
| 曝光      | 曝光元素的名称 |
| 逻辑埋点  | 对应的描述key  |

每条事件都会携带 **系统级别** 的公共参数，如设备型号、上报时间、运行环境等

## 页面

按前端页面的维护来管理事件，一个页面可能包含多种事件，每种事件可能包含1个或多个
* 访问该页面，数量为1
* 点击该页面的某个按钮，数量为N
* 用户在该页面的停留时间，数量为1
* 该页面某个弹窗的出现曝光次数, 数量为N
* 用户在该页面进行了某个行为过程中需要记录一下逻辑流程，数量为N

在实际业务中，一个页面上报的所有事件，一般会携带一些公共参数，比如页面id、页面来源utm_source等，因此提供了 **页面级别** 的公共参数配置

对于单个事件而言，除了系统级别和页面级别的公共参数之外，可能还会携带一些业务相关的独立参数，因此每个事件还可以配置独立的元数据配置

![](http://img.shymean.com/oPic/1648717369694_891.png)

基于这个约定，我们可以收集每个页面的埋点，然后汇总在一起，这样每个页面可以查哪些数据，就一目了然

![](http://img.shymean.com/oPic/1648718123402_184.png)

## 公共事件模板

还有一种特殊的事件，可能在多个页面触发。 eg：一个活动弹窗，可能会在数个页面触发曝光和点击事件

如果在每个页面都去配一次这个页面，无疑十分繁琐。基于这种场景，提供了事件模板的配置。

其配置单个事件保持一致，唯一的区别是增加了页面的多选项，可以选择当前事件生效的页面

![](http://img.shymean.com/oPic/1648718381606_120.png)

保存之后前往对应的页面，也可以在页面的事件列表中看见该事件

![](http://img.shymean.com/oPic/1648718454525_380.png)

除了无法在页面编辑处修改之外，与常规的事件没有任何区分

## 访问追踪

> 本章节相关字段待定

有时候，在单次会话期间，需要关注某个页面的访问来源，在非web的环境下，referer并不足以实现收集页面来源的功能，因此需要开发者自己实现

可以将来源分为应用内部来源和应用外部来源

对于外部来源
* `utm_source`，用于追踪页面外部来源，比如通过第三方广告平台投放的广告，跳转到某个落地承接页，承接页会上报该数据
* `utm_campaign`，外部投放的广告名称

对于内部来源
* `from_page`，用于追踪页面内部来源，比如从页面A跳转到了页面B，页面B会上报该字段的内容为页面A
* `from_pos`，从来源页面的某个位置跳转过来

看起来直接查日志记录就可以进行会话追踪了
