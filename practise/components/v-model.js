import Vue from 'vue'

const comp = {
  template: `
    <div>
      <input type="text" @input="handelValue" :value="value1">
    </div>
  `,
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  methods: {
    handelValue (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: comp
  },
  el: '#root',
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
      <p>{{value}}</p>
    </div>
  `,
  data: {
    value: ''
  }
})
