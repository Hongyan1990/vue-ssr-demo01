<template>
    <div id="todo">
      <!--<p>{{counter}}{{fullName}}</p>-->
      <!--<p>{{text1}}</p>-->
      <!--<p>{{textPlus}}</p>-->
        <div>
          <tabs :value="filter" @changeHandleTab="changeTabs">
            <tab :index="val" :label="val" v-for="val in states" :key="val"></tab>
          </tabs>
        </div>
        <section class="todo-input">
            <input type="text"
                   placeholder="请输入你要去做的事情"
                   autofocus="true"
                   v-model="tabVal"
                   @keyup.enter="addTodo"
            >
        </section>
        <section>
            <todo-item :todoData="todo"
                       v-for="todo in filteredTodos"
                       :key="todo.id"
                       @del="delTodo"
            />
        </section>
        <section>
            <todo-tabs :filter="filter"
                       :todos="todos"
                       @filterTodos="filterTodos"
                       @clear="clearCompleted"
            />
        </section>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import TodoTabs from './TodoTabs.vue'
import {
  mapState,
  mapActions
} from 'vuex'

let id = 0
export default {
  name: 'todo',
  metaInfo: {
    title: 'todo vue'
  },
  components: {
    TodoItem,
    TodoTabs
  },
  beforeRouteEnter (to, from, next) {
    console.log('Todo before enter')
    next(vm => {
      console.log('this is vm.id ', vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('Todo before update', this.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Todo before leave')
    next()
  },
  data () {
    return {
      states: ['all', 'active', 'completed'],
      filter: 'all',
      tabVal: ''
    }
  },
  props: ['id'],
  mounted () {
    // console.log(this.$route)
    // console.log(this.id)
    // this.$store.state.count = 3
    // let i = 1
    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 123
    //   })
    // }, 1000)
    this.fetchTodos()
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    this['a/updateText1']('abc')
    this['a/add']()
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(v => v.complated === completed)
    }
    // count () {
    //   return this.$store.state.count
    // },
    // ...mapState({
    //   counter: 'count',
    //   text1: (state) => state.a.text
    // }),
    // ...mapGetters({
    //   'fullName': 'fullName',
    //   textPlus: 'a/textPlus'
    // })
    // text1 () {
    //   return this.$store.state.a.text
    // }
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        complated: false
      })
      e.target.value = ''
    },
    delTodo (id) {
      this.todos.splice(this.todos.indexOf(this.todos.find(todo => todo.id === id)), 1)
    },
    filterTodos (state) {
      this.filter = state
    },
    clearCompleted () {
      this.todos = this.todos.filter(v => !v.complated)
    },
    // ...mapMutations(['updateCount', 'a/updateText1']),
    // ...mapActions(['updateCountAsync', 'a/add']),
    ...mapActions(['fetchTodos']),
    changeTabs (index) {
      this.filter = index
    }
  }
}
</script>

<style scoped>
#todo {
    width: 500px;
    background-color: rgba(204, 204, 204, 0.7);
    position: absolute;
    left: 50%;
    margin-left: -250px;
}
.todo-input {
    text-align: center;
}
.todo-input input {
    width: 300px;
    line-height: 25px;
    padding: 5px;
    margin: 10px;
}
</style>
