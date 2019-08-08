<template>
    <header>
        <!--<h1 :class="$style.myTitle">积分商城</h1>-->
      <div class="my-header">
        <div class="logo"><span class="logo-icon"></span>PointsShop</div>
        <div class="user-info"><span class="login-out" @click="loginOut">退出</span>{{userName}}</div>
      </div>
    </header>
</template>

<script>
  import cookie from '../util/cookie.js'

  export default {
    name: 'todo-header',
    props: {
      userName: {
        type: String,
        default: ''
      }
    },
    methods: {
      loginOut () {
        cookie.delCookie('name')
        cookie.delCookie('token')
        this.$router.replace('/user/login')
      }
    }
  }
</script>

<style  scoped>
  .logo-icon {
    width: 40px;
    height: 40px;
    display: inline-block;
    background: url("../static/images/jifen-new.png") center no-repeat;
    background-size: contain;
  }
  .my-header {
    padding: 0 5px;
    background-color: #409eff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .logo {
    align-items: center;
    display: flex;
    font-family: fantasy;
  }
  .login-out {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
  }
</style>
