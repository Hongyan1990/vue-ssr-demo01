import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-if="text === '1'">123</div>
      <div v-else-if="text === 'a'">abc</div>
      <div v-else>xxxx</div>
      
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}: {{index}}</li>
      </ul>
      
      <input type="text" v-model="text">
      
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="a" v-model="picker">
        <input type="radio" value="b" v-model="picker">
      </div>
    </div>
  `,
  data: {
    text: '1',
    arr: [1, 2, 3],
    picker: 'a'
  }
})
