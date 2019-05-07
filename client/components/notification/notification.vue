<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notify"
         :style="style"
         v-show="visable"
         @mouseenter="clearTimer"
         @mouseleave="creatTimer"
    >
      <span class="tips">{{content}}</span>
      <a class="btn" @click="closeNotify">{{closeTitle}}</a>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'notification',
    props: {
      content: {
        type: String,
        required: true
      },
      closeTitle: {
        type: String,
        default: 'close'
      }
    },
    computed: {
      style () {
        return {}
      }
    },
    data () {
      return {
        visable: true
      }
    },
    methods: {
      closeNotify () {
        this.$emit('close')
      },
      afterLeave () {
        this.$emit('closed')
      },
      afterEnter () {},
      clearTimer () {},
      creatTimer () {}
    }
  }
</script>

<style scoped>
.notify {
  display: flex;
  background-color: #303030;
  color: rgba(255, 255, 255, 1);
  align-items: center;
  padding: 20px;
  min-width: 280px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  justify-content: space-between;
  transition: all .3s
}
a.btn {
  cursor: pointer;
  color: #ff4081;
}
</style>
