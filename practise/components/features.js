import Vue from 'vue'
const childComp = {
  template: `<div>this is chuld {{data.value}}</div>`,
  inject: ['data'],
  mounted () {

  }
}
const comp = {
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  components: {
    ChildComp: childComp
  },
  template: `
    <div :style="style">
      <slot value="123"></slot>
      <child-comp></child-comp>
    </div>
  `,
  data () {
    return {
      style: {
        width: '300px',
        height: '300px',
        border: '1px solid red'
      }
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}

new Vue({
  name: 'root',
  provide () {
    let data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      data
    }
  },
  components: {
    CompOne: comp
  },
  el: '#root',
  template: `
      <div>
        <comp-one ref="comp">
          <!--<span slot="header">this is header</span>-->
          <!--<span slot="body">this is body</span>-->
          <span ref="span" slot-scope="props">{{props.value}}{{value}}</span>
        </comp-one>
        <input type="text" v-model="value">
      </div>
    `,
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span)
  }
})
