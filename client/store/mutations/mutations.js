export default {
  updateCount (state, {num, num2}) {
    console.log(num2)
    state.count = num
  },
  fillTodos (state, todos) {
    state.todos = todos
  },
  doLogin (state, userInfo) {
    state.userInfo = userInfo
  },
  handleAddTodo (state, todo) {
    state.todos.unshift(todo)
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
