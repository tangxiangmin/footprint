import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { useEffect, useRef, useState } from 'react'
import { Route as IRoute, routes } from './router/index'

function RouterViews() {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component
        return <Route path={route.path} key={route.name} element={<Component />} />
      })}
    </Routes>
  )
}

function Navs() {
  const list = [{ link: '/' }, { link: '/list' }, { link: '/detail/1' }, { link: '/detail/2' }]
  return (
    <ul>
      {list.map((row) => {
        return (
          <li key={row.link}>
            <Link to={row.link}>{row.link}</Link>
          </li>
        )
      })}
    </ul>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const onClick = () => {
    setCount(count + 1)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <p>Hello Vite + React!</p>
        <button onClick={onClick}>click {count}</button>
        <Navs />
        <RouterViews />
      </div>
    </BrowserRouter>
  )
}

export default App
