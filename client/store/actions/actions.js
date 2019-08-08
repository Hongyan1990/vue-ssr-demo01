import clientModel from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({content: '请先登录哦！'})
    bus.$emit('toLogin')
    return
  }
  if (err.code === 400) {
    notify({content: '用户名或密错误！'})
  }
}

export default {
  // updateCountAsync (store, data) {
  //   setTimeout(() => {
  //     store.commit('updateCount', {num: data.num, num2: 22})
  //   }, data.time)
  // },
  fetchTodos ({commit}, param) {
    commit('startLoading')
    clientModel.getAllTodos(param)
      .then(data => {
        commit('fillTodos', data)
        commit('endLoading')
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  fetchTodo ({commit}, id) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      clientModel.getTodo(id)
        .then(data => {
          resolve(data)
          commit('handleTodo', data)
          commit('endLoading')
        })
        .catch(err => {
          reject(err)
          commit('endLoading')
          handleError(err)
        })
    })
  },
  toLogin ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      commit('startLoading')
      clientModel.userLogin(username, password)
        .then(data => {
          commit('doLogin', {data, username})
          commit('endLoading')
          notify({content: '登陆成功'})
          resolve()
        })
        .catch(err => {
          handleError(err)
          if (err.code === 404) {
            notify({content: '登陆失败'})
          }
          commit('endLoading')
          reject(err)
        })
    })
  },
  createTodo ({commit}, todo) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      clientModel.addTodo(todo)
        .then(data => {
          commit('handleAddTodo', data)
          commit('endLoading')
          resolve(data)
          notify({
            content: '你又增加了一条待办事项'
          })
        })
        .catch(err => {
          handleError(err)
          reject(err)
          commit('endLoading')
        })
    })
  },
  updateTodo ({commit}, todo) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      clientModel.updateTodo(todo.points_user, todo)
        .then(data => {
          commit('endLoading')
          resolve(data)
          // commit('handleUpdateTodo', data)
        })
        .catch(err => {
          handleError(err)
          commit('endLoading')
          reject(err)
        })
    })
  },
  deleteTodo ({commit}, id) {
    commit('startLoading')
    clientModel.deleteTodo(id)
      .then(() => {
        commit('handleDeleteTodo', id)
        commit('endLoading')
        notify({
          content: '删除事项成功'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  clearAllCompleted ({commit, state}) {
    const ids = state.todos.filter(v => v.complated).map(t => t.id)
    commit('startLoading')
    clientModel.clearAllCompleted(ids)
      .then(() => {
        commit('handleClearAllCompleted')
        commit('endLoading')
        notify({
          content: '清空了已完成的事项'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  }
}
