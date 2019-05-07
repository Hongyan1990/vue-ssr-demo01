<template>
    <header>
        <h1 :class="$style.myTitle">My Todo</h1>
    </header>
</template>

<script>
    export default {
      name: 'todo-header'
    }
</script>

<style module>
.my-title {
    text-align: center;
}
</style>
