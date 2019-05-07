<script>
  import TabContainer from './tab-container.vue'
  export default {
    name: 'Tabs',
    components: {
      TabContainer
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        panes: []
      }
    },
    methods: {
      changeHandle (index) {
        this.$emit('changeHandleTab', index)
      }
    },
    render () {
      return (
        <div class="tabs">
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
          <tab-container panes={this.panes}></tab-container>
        </div>
      )
    }
  }
</script>

<style scoped>
.tabs-header {
  display: flex;
  padding-left: 0px;
  border-bottom: 2px solid #aaa;
}
</style>
