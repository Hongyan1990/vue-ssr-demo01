<template>
  <form class="login" @submit="login">
    <h2>
      <span>Login</span>
      <span class="error-msg" v-show="errMsg">{{errMsg}}</span>
    </h2>
    <input type="text" class="login-input" v-model="username" placeholder="User Name">
    <input type="password" class="login-input" v-model="password" placeholder="Password" autocomplete="new-password">
    <button type="submit" class="login-btn">登 录</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  metaInfo: {
    title: 'Login vue'
  },
  data () {
    return {
      errMsg: '',
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['toLogin']),
    login (e) {
      e.preventDefault()
      if (this.validteForm()) {
        //  发送请求
        this.toLogin({
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.replace('/app')
        })
      }
    },
    validteForm () {
      if (!this.username) {
        this.errMsg = '用户名不能为空'
        return false
      }
      if (!this.password) {
        this.errMsg = '密码不能为空'
        return false
      }
      this.errMsg = ''
      return true
    }
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  height: 250px;
  background-color: rgba(204, 204, 204, 0.7);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
  .login h2 {
    font-weight: normal;
    padding: 10px;
    margin: 0px;
  }
  .login-input {
    margin: 10px auto;
    line-height: 30px;
    padding-left: 10px;
    width: 90%;
    border-radius: 2px;
    border: none;
  }
  .login-btn {
    width: 30%;
    line-height: 30px;
    margin: 20px auto;
    background-color: #5e99d5e8;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .error-msg {
    font-size: 16px;
    color: red;
  }
</style>
