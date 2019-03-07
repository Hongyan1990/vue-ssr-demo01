<template>
    <div class="todo-tabs">
        <span>{{unFinishedItems}} items left</span>
        <section>
            <span v-for="state in states"
                  :key="state"
                  :class="['tabs', filter===state?'actived':'']"
                  @click="checkTabs(state)"
            >{{state}}
            </span>
        </section>
        <span class="delete-comp" @click="clearCompleted">Clear Completed</span>
    </div>
</template>

<script>
    export default {
        name: "todo-tabs",
        data() {
            return {
                states: ['all', 'active', 'completed']
            }
        },
        props: {
            filter: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true
            }
        },
        computed: {
            unFinishedItems() {
                return this.todos.filter(v => !v.complated).length;
            }
        },
        methods: {
            checkTabs(state) {
                this.$emit('filterTodos', state)
            },
            clearCompleted() {
                this.$emit('clear')
            }
        }
    }
</script>

<style scoped>
.todo-tabs {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 10px;
}
span.actived {
    border-color: blue;
    color: blue;
}
.tabs {
    padding: 3px 5px;
    border: 1px solid #555;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
}
.delete-comp {
    cursor: pointer;
}
</style>
