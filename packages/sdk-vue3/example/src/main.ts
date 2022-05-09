import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import {initLog} from "./initLog"


initLog()

createApp(App).use(router).mount('#app')
