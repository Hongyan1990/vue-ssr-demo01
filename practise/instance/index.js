import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}}{{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})

app.$mount('#root')

let i = 0
setInterval(() => {
  i++
  // app.text += 1
  // app.$options.data.text += 1
  // app.text += 1
  // app.obj.a = i
  // app.$forceUpdate()
  app.$set(app.obj, 'a', i)
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$options)
// console.log(app.$el)
// app.$options.render = (h) => {
//   return h('div', {}, 'hello')
// }
// console.log(app.$root === app)
// app.$on('test', () => {
//   console.log('test on')
// })
// app.$emit('test')
// console.log(app.$refs)
// console.log(app.$isServer)
// const unWatch = app.$watch('text', (newVal, oldVal) => {
//   console.log(`${newVal}: ${oldVal}`)
// })
//
// setTimeout(() => {
//   unWatch()
// }, 2000)

//app.$forceUpdate()
// app.$nextTick()
