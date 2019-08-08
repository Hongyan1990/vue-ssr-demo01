import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import VueMeta from 'vue-meta'
import { Button, Input, Dialog, Tabs, TabPane, Radio, Table, TableColumn, Pagination, RadioGroup } from 'element-ui'

import createRouter from './config/router.js'
import createStore from './store/store.js'
import notify from './components/notification'
// import Tabs from './components/Tabs'

import './static/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueMeta)
Vue.use(notify)
// Vue.use(Tabs)
Vue.use(Button)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(RadioGroup)

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
