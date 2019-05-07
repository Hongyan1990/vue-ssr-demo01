import Vue from 'vue'

const comp = {
  template: `
    <div>
      <p>{{text}}</p>
      <p><input type="text" v-model="text"></p>
      <p>{{name}}</p>
    </div>
  `,
  props: {
    name: String
  },
  data () {
    return {
      text: '123'
    }
  },
  mounted () {
    console.log('comp1')
  }
}

new Vue({
  extends: comp,
  el: '#root',
  propsData: {
    name: '1234'
  },
  data: {
    text: 'abc'
  },
  mounted () {
    console.log('comp2')
  }
})
