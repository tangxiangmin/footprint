## 使用

下面展示了`react-router-dom` v6 中使用埋点的方式

定义route

```tsx
const routes: Array<Route> = [
  {
    path: '/detail/:id',
    name: 'detailPage',
    component: Detail,
    meta: {
      requiresAuth: false,
      log: {
        name: 'detailPage',
        pv: true,
        duration: false,
        async: false
      }
    }
  },
  route404
]
```

渲染路由

```tsx
function RouterViews() {
  return (
    <Routes>
      {
        routes.map((route) => {
          const Component = route.component
          return <Route path={route.path} key={route.name} element={<Component/>}/>
        })
      }
    </Routes>
  )
}
```

初始化埋点sdk

```js
import {init, sendBeacon} from "@footprint/sdk-react";
import {matchRoutes} from "react-router-dom";
import {routes, route404} from '../router';

export function getCurrentRoute() {
  // 获取当前路由对应的路由配置
  const [result] = matchRoutes(routes, window.location.pathname) || []
  if (!result || !result.route) return route404
  return result.route
}

export async function initLog() {
  // const reportPostApi = `http://localhost:1546/log/report`
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
```tsx
import {useTrackTask} from "@footprint/sdk-react";
export default function Home() {
  useTrackTask()
  return (<div>Home</div>)
}
```
复杂场景：设置公共参数、同一路由组件参数变化、点击事件
```tsx
import {useParams} from 'react-router-dom';
import {useMemo} from "react";
import {getCurrentTrackTask, useTrackTask} from "@footprint/sdk-react";

export default function Detail() {
  const params = useParams()

  const extend = useMemo(() => {
    return {}
  }, [])

  const extra = useMemo(() => {
    return {
      id: params.id
    }
  }, [params.id])

  useTrackTask(extend, extra)

  const onClick = () => {
    const trackTask = getCurrentTrackTask()
    trackTask.trackClick('btn-some')
  }

  return (<div>
    detail {params.id}

    <button onClick={onClick}>click me</button>
  </div>)
}
```
