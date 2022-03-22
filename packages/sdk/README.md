


一套便于扩展的埋点工具

## 使用

```js
import {init, getCurrentTrackTask} from "@footprint/sdk";

const host = process.env.VUE_APP_LOG_URL // 单独使用一个变量来保存接口地址，避免测试环境链接线上接口时污染数据
const reportGetApi = `${host}/api/dac/v1/log/reportGet`
const reportPostApi = `${host}/api/dac/v1/log/report`


const getCurrentRoute = () => {
  return router.currentRoute
}

const getCommonLogParams = () => {
  return {
    uuid: 'xxx'
  }
}

init({
  reportGetApi,
  reportPostApi,
  getCommonLogParams,
  getCurrentRoute,
})

const trackTask = getCurrentTrackTask()
trackTask.trackClick('btn-1', {courseId: 1}, {from: "xxx"})
```

Vue
```js
import Vue from 'vue'
import {VueLogPlugin, injectLogMixin} from '@footprint/sdk'

Vue.use(VueLogPlugin)
// 然后使用injectLogMixin包裹路由组件

```

React
```js
// TODO
```
