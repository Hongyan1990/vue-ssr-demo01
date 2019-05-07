import Vue from 'vue'

import Component from './notify-func.js'

const NotificationConstructor = Vue.extend(Component)

let instances = []
let seed = 1

const removeInstance = (inst) => {
  if (!instances) return
  const index = instances.findIndex(item => item.id === inst.id)
  const len = instances.length
  instances.splice(index, 1)
  if (len <= 1) return
  const removeHeight = inst.vm.height
  for (let i = index; i < len - 1; i++) {
    const curInst = instances[i]
    curInst.verticalOffset = parseInt(curInst.verticalOffset) - removeHeight - 16
  }
}

const notify = (option) => {
  const {
    autoClose,
    ...rest
  } = option
  if (Vue.prototype.$isServer) return
  let instance = new NotificationConstructor({
    data: { autoClose },
    propsData: {
      ...rest
    }
  })
  instance.vm = instance.$mount()
  instance.id = `notification_${seed++}`
  document.body.appendChild(instance.vm.$el)
  instance.vm.visable = true
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visable = false
  })

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.vm.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  // instance.height = instance.vm.$el.offsetHeight
  instances.push(instance)
  return instance.vm
}

export default notify
