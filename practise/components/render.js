import Vue from 'vue'

const comp = {
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (h) {
    return h('div', {
      style: this.style
      // on: {
      //   click: () => {
      //     this.$emit('click')
      //   }
      // }
    }, [this.$slots.header, this.props1])
  },
  props: ['props1'],
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid red'
      }
    }
  }
}

new Vue({
  components: {
    CompOne: comp
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span>abc</span>
  //   </comp-one>
  // `,
  el: '#root',
  data: {
    value: 123
  },
  render (h) {
    return h('comp-one', {
      ref: 'comp',
      props: {
        props1: this.value
      },
      // on: {
      //   click: this.handleClick
      // },
      nativeOn: {
        click: this.handleClick
      }
    }, [h('span', {ref: 'span', attrs: {id: 'id_12'}, slot: 'header', domProps: {innerHTML: '<span>hello</span>'}}, 'abc')])
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  }
})
