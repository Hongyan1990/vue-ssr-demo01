import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
          <div :class="[{'actived': !isActived}]">
            <p v-html="text" :style="styles"></p>
          </div>`,
  data: {
    text: '<span>123</span>',
    isActived: false,
    styles: {
      color: 'red'
    }
  }

})
