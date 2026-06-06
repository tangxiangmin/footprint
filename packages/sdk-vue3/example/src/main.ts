import { createApp } from 'vue'

import { VueLogPlugin } from '../../src/index'
import App from './App.vue'
import { initLog } from './initLog'
import router from './router'

initLog()

createApp(App).use(router).use(VueLogPlugin).mount('#app')
