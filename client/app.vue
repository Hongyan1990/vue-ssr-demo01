<template>
  <div>
    <div class="bg"></div>
    <todo-header></todo-header>
    <!--<todo></todo>-->
    <!--<router-link to="/app">app123</router-link>-->
    <!--<router-link to="/app">app456</router-link>-->
    <!--<router-link to="/login">login</router-link>-->
    <!--<tabs>-->
      <!--<tab :label="text">-->
        <!--<span slot="label">tab1</span>-->
        <!--<p>tab1 content</p>-->
      <!--</tab>-->
    <!--</tabs>-->
    <!--<ul>-->
      <!--<li>tab1</li>-->
    <!--</ul>-->
    <!--<div>-->
      <!--<p>tab1 coontent</p>-->
    <!--</div>-->
    <transition name="fade">
      <router-view />
    </transition>
    <!--<a @click="notifyFun">click me</a>-->
    <!--<notification :content="'notify test'"/>-->
    <todo-footer></todo-footer>
    <router-view name="a" />
  </div>
</template>

<script>
import TodoHeader from './layout/TodoHeader.vue'
import TodoFooter from './layout/TodoFooter.vue'
// import Todo from './views/todo/Todo.vue'

export default {
  name: 'app',
  components: {
    TodoHeader,
    TodoFooter
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
  methods: {
    notifyFun () {
      this.$notify({content: `notify test${this.index++}`, autoClose: 3000})
    }
  }
}
</script>

<style scoped>

</style>
