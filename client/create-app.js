import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import VueMeta from 'vue-meta'
import createRouter from './config/router.js'
import createStore from './store/store.js'
import notify from './components/notification'
import Tabs from './components/Tabs'

import './static/styles/reset.css'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueMeta)
Vue.use(notify)
Vue.use(Tabs)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return {app, router, store}
}
