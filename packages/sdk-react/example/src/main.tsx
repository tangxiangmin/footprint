import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {initLog} from "./initLog";

initLog()

ReactDOM.createRoot(document.getElementById('root')!).render(<App/>)
