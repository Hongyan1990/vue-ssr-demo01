export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {num: data.num, num2: 22})
    }, data.time)
  }
}
