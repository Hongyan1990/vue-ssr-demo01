<template>
  <div>
    <el-dialog title="创建积分用户" :visible.sync="dialogVisibale">
      <div>
        <span v-show="validateErr" class="err-tip">{{validateMsg}}</span>
        <section class="p-item">
          <label for="phoneNumber">电话号码：</label>
          <el-input v-model.trim="points_user" placeholder="请输入手机号码" label="电话号码：" @blur="validatePhone"></el-input>
        </section>
        <section class="p-item">
          <label for="pointsNumber">积分：</label>
          <el-input v-model.number="points" placeholder="请输入积分" @blur="validatePhone"></el-input>
        </section>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddUserDialog">取 消</el-button>
        <el-button type="primary" @click="addUser" :disabled="validateErr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex'

  const PHONEREGEXP = /^1(3|4|5|6|7|8|9)\d{9}$/
  export default {
    name: 'createUser',
    props: {
      isShowDialog: {
        type: Boolean,
        default: false
      },
      num: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        points_user: '',
        points: 0,
        validateErr: false,
        validateMsg: ''
      }
    },
    computed: {
      dialogVisibale: {
        get () {
          return this.isShowDialog
        },
        set () {
          this.$emit('closeCreateUserDialog')
        }
      }
    },
    mounted () {

    },
    updated () {
      this.points_user = this.num
    },
    methods: {
      ...mapActions(['createTodo']),
      validatePhone () {
        if (!PHONEREGEXP.test(this.points_user)) {
          this.validateErr = true
          this.validateMsg = '输入手机号码错误，请重新输入！'
          return false
        } else if (this.points < 0) {
          this.validateErr = true
          this.validateMsg = '积分不能小于0！'
          return false
        } else {
          this.validateErr = false
          this.validateMsg = ''
          return true
        }
      },
      closeAddUserDialog () {
        this.points_user = ''
        this.$emit('closeCreateUserDialog')
      },
      addUser () {
        if (!this.validatePhone()) {
          return
        }
        this.createTodo({
          points_user: this.points_user,
          points: this.points
        }).then(() => {
          this.closeAddUserDialog()
        })
      }
    }
  }
</script>

<style scoped>
  .p-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .p-item > label {
    width: 100px;
  }
  .err-tip {
    color: red;
    margin-bottom: 10px;
    display: inline-block;
  }
</style>
