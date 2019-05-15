import clientModel from '../../model/client-model.js'

const handleError = () => {
//
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
  }
}
