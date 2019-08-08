import cookie from '../../util/cookie.js'
const moment = require('moment')
export default {
  updateCount (state, {num, num2}) {
    console.log(num2)
    state.count = num
  },
  fillTodos (state, todos) {
    state.count = Math.ceil(todos.count / 5)
    state.todos = []
    todos.results.forEach(item => {
      item.update_time = item.update_time && moment(item.update_time).format('YYYY-MM-DD HH:mm')
      state.todos.push(item)
    })
  },
  handleTodo (state, todo) {
    state.todo = todo
  },
  doLogin (state, userInfo) {
    // state.userInfo = userInfo
    console.log(userInfo)
    state.userInfo.name = userInfo.username
    state.userInfo.token = userInfo.data.token
    cookie.setCookie('name', userInfo.username, 7)
    cookie.setCookie('token', userInfo.data.token, 7)
  },
  handleAddTodo (state, todo) {
    // state.todos.unshift(todo)
  },
  handleUpdateTodo (state, todo) {
    const index = state.todos.findIndex(v => v.id === todo.id)
    state.todos.splice(index, 1, todo)
  },
  handleDeleteTodo (state, id) {
    const index = state.todos.findIndex(v => v.id === id)
    state.todos.splice(index, 1)
  },
  handleClearAllCompleted (state) {
    state.todos = state.todos.filter(v => !v.complated)
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
