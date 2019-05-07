<script>
  export default {
    name: 'tab-container',
    props: {
      panes: {
        type: Array,
        default: []
      }
    },
    render () {
      const tabContainer = this.panes.map(item => {
        return item.active ? item.$slots.default : null
      })
      return (
        <div>
          {tabContainer}
        </div>
      )
    }
  }
</script>

<style scoped>

</style>
