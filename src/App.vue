<template>
  <div id="app">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="menuSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             v-if="isShow">
      <el-menu-item index="1">学生表</el-menu-item>
      <el-menu-item index="2">课程表</el-menu-item>
      <el-menu-item index="3">选课表</el-menu-item>
      <el-menu-item index="4">备份</el-menu-item>
      <el-menu-item index="5">返回登录界面</el-menu-item>
    </el-menu>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="footer">
      <a href="https://beian.miit.gov.cn/"
         target="_blank">吉ICP备20004071号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isShow () {
      if (this.$route.path == '/' || this.$route.path == '/login') {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted () {
    console.log(this.$route);
  },
  data () {
    return {
      activeIndex: '1',
      backup_name: "TT"
    }
  },
  methods: {
    menuSelect (key, keyPath) {
      console.log(key, keyPath);
      if (key == 1) {
        this.$router.push('index')
      } else if (key == 2) {
        this.$router.push('opclass')
      } else if (key == 3) {
        this.$router.push('opsc')
      } else if (key == 4) {
        console.log(this.student_input)
        this.$axios
          .post('/backup').then(resp => {
            if (resp && resp.status === 200) {
              this.$message({
                type: 'success',
                message: '备份成功!'
              })
            }
          }).catch((failResponse) => {
            this.$message.error(
              '备份失败!'
            )
          })
      } else if (key == 5) {
        this.$router.push('login')
      }

    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  // margin-top: 60px;
  height: 100vh;
}
.footer {
  margin-bottom: 15px;
}
</style>
