import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import router from './router'

import { initLog } from './initLog'
import { VueLogPlugin } from '../../src'

Vue.use(VueRouter)
Vue.use(VueLogPlugin)

initLog()

new Vue({
  el: '#app',
  // @ts-ignore
  router,
  render: (h) => h(App),
}).$mount()
