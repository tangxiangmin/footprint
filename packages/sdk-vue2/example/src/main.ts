import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import router from './router'

import { VueLogPlugin } from '../../src'
import { initLog } from './initLog'

Vue.use(VueRouter)
Vue.use(VueLogPlugin)

initLog()

new Vue({
  el: '#app',
  // @ts-ignore
  router,
  render: (h) => h(App),
}).$mount()
