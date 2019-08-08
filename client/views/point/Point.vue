<template>
    <div>
      <todo-header :userName="userInfo.name"></todo-header>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="searchInfo" @click="searchUser">
          <el-button slot="append" icon="el-icon-search" @click="searchUser" ></el-button>
        </el-input>
      </div>
      <div class="user-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户列表" name="first">
            <el-table
              :data="todos"
              style="width: 100%"
              height="350px"
              stripe
            >
              <template slot="empty">
                <img src="../../static/images/no-data.png" style="width: 200px; margin-top: 20px;"/>
                <p style="margin: 0; line-height: 30px">暂无数据</p>
              </template>
              <el-table-column
                prop="points_user"
                label="用户"
                width="180">
              </el-table-column>
              <el-table-column
                prop="points"
                label="积分"
                width="180">
              </el-table-column>
              <el-table-column
                prop="add_time"
                label="首次添加时间">
              </el-table-column>
              <el-table-column
                prop="update_time"
                label="最近修改时间">
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                small
                layout="prev, pager, next"
                @current-change="changePage"
                :page-count="count">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <create-user :isShowDialog="dialogFormVisible" @closeCreateUserDialog="closeCreateUserDialog" :num="searchInfo"></create-user>
        <modify-points :mDialogVisibale="dialogModifyVisible" @closeModifyDialog="closeModifyDialog"></modify-points>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'element-ui'
  import TodoHeader from '../../layout/TodoHeader.vue'
  import CreateUser from './CreateUser.vue'
  import ModifyPoints from './ModifyPoints.vue'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'Point',
    components: {
      TodoHeader,
      CreateUser,
      ModifyPoints
    },
    data () {
      return {
        searchInfo: '',
        mobileNumber: '',
        dialogFormVisible: false,
        dialogModifyVisible: false,
        noUserTip: '该用户不存在，是否要创建？',
        activeName: 'first',
        pageParams: {
          p: 1,
          page_size: 5
        }
      }
    },
    mounted () {
      this.fetchTodos(this.formatPathSearch(this.pageParams))
    },
    computed: {
      ...mapState(['todos', 'count', 'userInfo'])
    },
    methods: {
      ...mapActions(['fetchTodos', 'fetchTodo']),
      open (tip) {
        MessageBox.confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dialogFormVisible = true
        }).catch(() => {})
      },
      searchUser () {
        this.fetchTodo(this.searchInfo)
          .then((data) => {
            if (data && data.points_user) {
              this.dialogModifyVisible = true
            } else {
              this.open(this.noUserTip)
            }
          })
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      formatPathSearch (params) {
        let str = ''
        for (let key in params) {
          str += `${key}=${params[key]}&`
        }
        str = str.slice(0, str.length - 1)
        return str
      },
      changePage (e) {
        this.pageParams.p = e
        this.fetchTodos(this.formatPathSearch(this.pageParams))
      },
      closeCreateUserDialog () {
        this.dialogFormVisible = false
        this.initPage()
      },
      closeModifyDialog () {
        this.dialogModifyVisible = false
        this.initPage()
      },
      initPage () {
        this.searchInfo = ''
        this.pageParams.p = 1
        this.fetchTodos(this.formatPathSearch(this.pageParams))
      }
    }
  }
</script>

<style scoped>
  .search {
    line-height: 200px;
    padding: 0 20%;
  }
  .user-list {
    padding: 0 20%;
  }
  .page {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>
