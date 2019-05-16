import Vuex from 'vuex'
import defaultState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 123
    //     },
    //     mutations: {
    //       updateText1 (state, text) {
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getter, rootState) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         commit('updateText1', rootState.count)
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     }
    //   }
    // }
  })
  if (module.hot) {
    module.hot.accept([
      './state/state.js',
      './mutations/mutations.js',
      './getters/getters.js',
      './actions/actions.js'
    ], () => {
      const newState = require('./state/state.js').default
      const newMutations = require('./mutations/mutations.js').default
      const newGetters = require('./getters/getters.js').default
      const newActions = require('./actions/actions.js').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
