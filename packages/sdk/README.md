


一套便于扩展的埋点工具

## 使用

```js
import {init, getCurrentTrackTask, sendBeacon, sendPxPoint} from "@footprint/sdk";

const getCurrentRoute = () => {
  return router.currentRoute // 每个页面返回一个独立的key即可
}

const sendLog = (data)=>{
  data =  {...data, uuid:'xxx'}  // 可以添加一些额外的参数
  
  // 可以自己实现上报的接口
  if(typeof widnow.navigator.sendBeacon ==='function'){
    return sendBeacon('http://xxx/log_post', data)
  }else {
    return sendPxPoint('http://xxx/log_get', data)
  }
}

// 初始化埋点sdk
init({
  sendLog,
  getCurrentRoute,
})

// 获取当前页面的上报实例，
const trackTask = getCurrentTrackTask()
trackTask.trackClick('btn-1', {}, {}) // 上报埋点，会自动合并系统级、页面级公共参数，这里只需要传事件特定参数即可
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
