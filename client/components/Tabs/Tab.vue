<script>
  export default {
    name: 'Tab',
    props: {
      index: {
        type: [Number, String],
        required: true
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    computed: {
      active () {
        return this.$parent.value === this.index
      }
    },
    methods: {
      clickHandle () {
        this.$parent.changeHandle(this.index)
      }
    },
    mounted () {
      this.$parent.panes.push(this)
    },
    render () {
      const tabLabel = this.$slots.label || <span>{this.label}</span>
      const className = {
        tab: true,
        active: this.active
      }
      return (
        <li class={className} on-click={this.clickHandle}>
          {tabLabel}
        </li>
      )
    }
  }
</script>

<style scoped>
.tab {
  list-style: none;
  margin: 0 20px;
  cursor: pointer;
  padding-bottom: 5px;
}
.active {
  border-bottom: 2px solid #000;
  margin-bottom: -2px;
}
</style>
