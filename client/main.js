import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import createRouter from './config/router.js'
import createStore from './store/store.js'

import './static/styles/reset.css'

Vue.use(Router)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()

// store.watch((state) => state.count + 2, (newCount) => {
//   console.log('count is change newCount: ' + newCount)
// })

// store.subscribe((mutation, state) => {
//   console.log('mutation type: ' + mutation.type)
//   console.log(`mutation payload: ${JSON.stringify(mutation.payload)}`)
// })

store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

router.beforeEach((to, from, next) => {
  console.log('router before each')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('router before resolve')
  next()
})
router.afterEach((to, from) => {
  console.log('router after each')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
