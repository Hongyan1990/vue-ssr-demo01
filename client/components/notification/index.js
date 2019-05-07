import notification from './notification.vue'
import notify from './function.js'

export default (Vue) => {
  Vue.component(notification.name, notification)
  Vue.prototype.$notify = notify
}
