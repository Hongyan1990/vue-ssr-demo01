<template>
  <div>
    <div class="bg"></div>
    <div id="loading" v-show="loading">
      <loading></loading>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <todo-footer></todo-footer>
    <router-view name="a" />
  </div>
</template>

<script>
import TodoFooter from './layout/TodoFooter.vue'
import Loading from './components/loading/loading.vue'
import {mapState} from 'vuex'
// import Todo from './views/todo/Todo.vue'

export default {
  name: 'app',
  components: {
    TodoFooter,
    Loading
    // Todo
  },
  data () {
    return {
      text: 'hello worldaaa',
      index: 1
    }
  },
  mounted () {

  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    notifyFun () {
      this.$notify({content: `notify test${this.index++}`, autoClose: 3000})
    }
  }
}
</script>

<style lang="stylus" scoped>
  #loading{
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(255,255,255,.3)
    z-index 99
    display flex
    align-items center
    justify-content center
  }
</style>
