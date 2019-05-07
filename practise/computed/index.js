import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>{{myName}}</p> 
      <p>{{getMyName()}}</p>
      <p>Number: {{num}}</p>
      <p>Number:<input type="text" v-model="num"></p>  
      <p>FirstName:{{firstname}}</p> 
      <p>LastName: {{lastname}}</p>
      <p>FullName: {{fullname}}</p>
      <p>FisrtName: <input type="text" v-model="firstname"></p>
      <p>LastName: <input type="text" v-model="lastname"></p>
      <p>Obj: {{obj.a}}</p>
      <p>Obj: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstname: 'jia',
    lastname: 'hongyan',
    num: 0,
    fullname: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    myName () {
      console.log('myname computed')
      return `${this.firstname} ${this.lastname}`
    }
  },
  watch: {
    // firstname (newName, oldName) {
    //   this.fullname = newName + ' ' + this.lastname
    // }
    firstname: {
      handler (newName, oldName) {
        this.fullname = newName + ' ' + this.lastname
      },
      immediate: true
    },
    // obj: {
    //   handler (newName, oldName) {
    //     console.log('obj')
    //   },
    //   immediate: true,
    //   deep: true
    // }
    'obj.a': {
      handler (newName, oldName) {
        console.log('obj')
      }
    }
  },
  methods: {
    getMyName () {
      console.log('myname methods')
      return `${this.firstname} ${this.lastname}`
    }
  }
})
