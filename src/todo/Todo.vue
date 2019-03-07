<template>
    <div id="todo">
        <section class="todo-input">
            <input type="text"
                   placeholder="请输入你要去做的事情"
                   autofocus="true"
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

let id = 0;
export default {
    name: "todo",
    components: {
        TodoItem,
        TodoTabs
    },
    data() {
        return {
            todos: [],
            filter: 'all'
        }
    },
    computed: {
        filteredTodos() {
            if(this.filter === 'all') {
                return this.todos;
            }
            const completed = this.filter === 'completed';
            return this.todos.filter(v => v.complated === completed);
        }
    },
    methods: {
        addTodo(e) {
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                complated: false
            });
            e.target.value = ''
        },
        delTodo(id) {
            this.todos.splice(this.todos.indexOf(this.todos.find(todo => todo.id === id)), 1)
        },
        filterTodos(state) {
            this.filter = state;
        },
        clearCompleted() {
            this.todos = this.todos.filter(v => !v.complated);
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
