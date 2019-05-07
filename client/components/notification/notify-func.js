import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.creatTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    creatTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visable = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      // console.log('--------1------')
      this.height = this.$el.offsetHeight
    }
  },
  data () {
    return {
      verticalOffset: 0,
      timer: null,
      autoClose: 3000,
      visable: false,
      height: 0
    }
  }
}
