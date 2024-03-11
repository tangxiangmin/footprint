## 使用

下面展示了在`vue2`、`vue-router@3`的项目中使用埋点sdk的方式

定义路由

```js
import Router from 'vue-router'
import { injectLogMixin } from "@footprintjs/sdk-vue2";

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
    component: injectLogMixin(() => import('../views/index.vue')),
    meta: {
      log: createLogParams('index')
    }
  },
  {
    path: '/list',
    name: 'list',
    component: injectLogMixin(() => import('../views/list.vue')),
    meta: {
      log: createLogParams('list')
    }
  },
  {
    path: '/detail/:id',
    name: 'detailPage',
    component: injectLogMixin(() => import('../views/detail.vue')),
    meta: {
      log: createLogParams('detailPage')
    }
  },
]

export default new Router({
  routes
})
```

渲染路由

```js
new Vue({
  el: "#app",
  // @ts-ignore
  router,
  render: (h) => h(App)
}).$mount()
```

初始化埋点sdk

```js
import { init } from "../../src/index";
import router from './router'

export async function initLog() {

  // const host = 'http://localhost:1546'
  // const reportPostApi = `${host}/log/report`

  const getCurrentRoute = () => {
    return router.currentRoute
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

简单场景：自动上报pv和停留

通过`injectLogMixin`注入的路由组件会根据`meta.log`配置自动上报

复杂场景：设置公共参数、同一路由组件参数变化、点击事件

```vue

<script>
import { getCurrentTrackTask } from "@footprintjs/sdk-vue2";

export default {
  name: "detail",
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    const trackTask = getCurrentTrackTask()
    trackTask.setCommonExtra({ id: this.id })
  },
}
</script>
```

此外还定义了一些自定义指令

* `v-log.exposure.once`曝光事件，当节点出现在屏幕内时上报
* `v-log.click`点击事件，点击某个节点时上报

```vue
<h2>scroll exposure event</h2>
<div class='scroll'>
<div class='scroll-item' v-for='item in 10' v-log.exposure.once="{key:'some-img', extra:{no:item}}"></div>
</div>
<h2>click event</h2>
<button v-log.click="{key:'btn'}">click me</button>
```
