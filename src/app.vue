<template>
    <div>
        <div class="bg"></div>
        <todo-header></todo-header>
        <todo></todo>
        <todo-footer></todo-footer>
    </div>
</template>

<script>
import TodoHeader from './todo/TodoHeader.vue'
import TodoFooter from './todo/TodoFooter.vue'
import Todo from './todo/Todo.vue'

export default {
    name: "app",
    components: {
        TodoHeader,
        TodoFooter,
        Todo
    },
    data() {
        return {
            text: 'hello worldaaa'
        }
    }
}
</script>

<style scoped>
.bg {
    background-image: url("./static/images/veer.jpg");
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .8;
    z-index: -1;
}
</style>
