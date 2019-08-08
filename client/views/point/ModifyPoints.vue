<template>
  <div>
    <el-dialog title="修改积分" :visible.sync="dialogVisibale">
      <span v-show="saveBtnDisable" class="err-tip">兑换积分不能超过现有积分！</span>
      <div class="user-info">
        <section>
          <label>手机号：</label>
          <span>{{todo.points_user}}</span>
        </section>
        <section>
          <label>当前积分：</label>
          <span class="current-point">{{todo.points}}</span>
        </section>
        <section>
          <label>创建时间：</label>
          <span>{{todo.add_time}}</span>
        </section>
        <section>
          <label>更改类型：</label>
          <span>
            <el-radio-group v-model="radio" @change="volidatePoints">
              <el-radio label="1">新增积分</el-radio>
              <el-radio label="2">兑换积分</el-radio>
            </el-radio-group>
          </span>
        </section>
        <section class="point-input">
          <label>{{radio === '1' ? '新增' : '兑换'}}积分：</label>
          <el-input v-model.number="points" placeholder="请输入积分" @blur="volidatePoints"></el-input>
        </section>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModifyPointsDialog">取 消</el-button>
        <el-button type="primary" @click="modifyPoints" :disabled="saveBtnDisable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    name: 'ModifyPoints',
    props: {
      mDialogVisibale: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        validateErr: false,
        saveBtnDisable: false,
        points: 0,
        radio: '1'
      }
    },
    computed: {
      ...mapState(['todo']),
      dialogVisibale: {
        get () {
          return this.mDialogVisibale
        },
        set () {
          this.$emit('closeModifyDialog')
        }
      }
    },
    methods: {
      ...mapActions(['updateTodo']),
      closeModifyPointsDialog () {
        this.$emit('closeModifyDialog')
      },
      volidatePoints () {
        if (this.radio === '2' && this.points > this.todo.points) {
          this.saveBtnDisable = true
          return false
        } else {
          this.saveBtnDisable = false
          return true
        }
      },
      modifyPoints () {
        if (!this.volidatePoints()) {
          return
        }
        let todo = Object.assign({}, this.todo)
        if (this.radio === '1') {
          todo.points += this.points
        } else if (this.radio === '2') {
          todo.points -= this.points
        }
        // let tip = this.radio === '1' ? `确定要新增${this.points}积分，新增后积分为<b>${this.todo.points}</b>` : `确定要兑换${this.points}积分，兑换后积分为<b>${this.todo.points}</b>`
        this.updateTodo(todo)
          .then(() => {
            this.closeModifyPointsDialog()
          })
      }
    }
  }
</script>

<style scoped>
  .user-info section {
    line-height: 30px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .user-info section > label {
    width: 100px;
    display: inline-block;
  }
  .point-input {
    display: flex;
  }
  .point-input label {
    min-width: 100px;
  }
  .current-point {
    font-weight: 700;
    font-size: 25px;
  }
  .err-tip {
    color: red;
    margin-bottom: 10px;
    display: inline-block;
  }
</style>
