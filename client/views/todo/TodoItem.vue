<template>
    <div class="todo-item">
        <input type="checkbox"
                class="ck-item"
               :checked="todoData.complated"
               @click="handleToggle"
        >
        <label class="todo-content" :class="{'complated': todoData.complated}">{{todoData.content}}</label>
        <span class="rm-content" @click="removeItem">x</span>
    </div>
</template>

<script>
    export default {
      name: 'todo-item',
      props: {
        todoData: {
          type: Object,
          required: true
        }
      },
      methods: {
        removeItem () {
          this.$emit('del', this.todoData.id)
        },
        handleToggle (e) {
          e.preventDefault()
          this.$emit('toggleTodo', this.todoData)
        }
      }
    }
</script>

<style scoped>
.todo-item {
    padding: 10px 20px;
    display: flex;
    align-items: center;
}
.todo-content {
    flex: 1;
}
.ck-item {
    margin-right: 10px;
}
.rm-content {
    cursor: pointer;
}
.complated {
    color: #999;
    text-decoration: line-through;
}
</style>
