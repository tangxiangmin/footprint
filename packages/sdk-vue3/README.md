


[示例代码]('./example/README.md')

## 使用

下面展示了在`vue3`、`vue-router@4`的项目中使用埋点sdk的方式

定义路由
```ts
const createLogParams = (name: string = '', pv = true, duration = false, async = false) => ({
  name,
  pv,
  duration,
  async
})

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      log: createLogParams('index')
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list.vue'),
    meta: {
      log: createLogParams('list')
    }
  },
  {
    path: '/detail/:id',
    name: 'detailPage',
    component: () => import('../views/detail.vue'),
    meta: {
      log: createLogParams('detailPage')
    }
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

渲染路由

```ts
createApp(App).use(router).mount('#app')
```

由于vue-router对于不同url但对应一个路由组件的场景，会使用缓存的组件更新而不是重新创建，可以在`router-view`上加一个key
```vue
<script setup lang="ts">
import {computed} from 'vue'
import {useRoute} from "vue-router";

const route = useRoute()
const routerKey = computed(() => {
  return route.fullPath
})

</script>
<template>
  <router-view :key="routerKey"></router-view>
</template>
```

初始化埋点sdk

```ts
import {init, sendBeacon} from "../../src/index";
import router from './router'

export async function initLog() {
  // const reportPostApi = `http://localhost:1546/log/report`

  const getCurrentRoute = () => {
    return router.currentRoute.value
  }

  const sendLog = (data: any) => {
    data = {
      ...data,
      eventTime: +new Date()
    }
    data.extra = JSON.stringify(data.extra)

    console.log('send log', data)
    // return sendBeacon(reportPostApi, data)
  }

  await init({
    sendLog,
    getCurrentRoute,
  })
}
```

路由组件中使用埋点

简单场景：自动上报pv和停留
```vue
<template>
  <h1>index</h1>
</template>

<script lang="ts" setup>
import {useTrackTask} from "@footprint/sdk-vue3";
useTrackTask()
</script>
```

复杂场景：设置公共参数、同一路由组件参数变化、点击事件
```vue
<template>
  <h1>
    detail {{ id }}
  </h1>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {computed} from "vue";
import {useTrackTask} from "@footprint/sdk-vue3";

const route = useRoute()

const id = computed(() => {
  return route.params.id || ''
})

useTrackTask({}, {id: id.value})

</script>

<style scoped>

</style>

```
