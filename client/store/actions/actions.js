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
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {num: data.num, num2: 22})
    }, data.time)
  },
  fetchTodos ({commit}) {
    clientModel.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  },
  toLogin ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      clientModel.userLogin(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({content: '登陆成功'})
          resolve()
        })
        .catch(err => {
          handleError(err)
          reject(err)
        })
    })
  }
}
