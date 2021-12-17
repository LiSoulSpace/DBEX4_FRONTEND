<template>
<body>
  <el-form class="login-container" label-position="left"
           label-width="0px">
  <el-form-item>
    <h3 class="login_title">系统登录</h3>
    <el-input v-model="loginForm.username" type="text" auto-complete="off"
              placeholder="账号"></el-input>
    <br>
  </el-form-item>
  <el-form-item>
    <el-input v-model="loginForm.password" type="password" auto-complete="off"
              placeholder="密码"></el-input>
  </el-form-item>
  <br>
  <el-form-item>
    <el-button type="primary" v-on:click="login">登 陆</el-button>
    <el-button type="primary" v-on:click="test_login">清 空</el-button>
  </el-form-item>
</el-form>
</body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      var _this = this
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.status === 200) {
            _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            this.$router.replace({ path: path === '/' || path === undefined ? '/index' : path })
          }
        })
        .catch((failResponse) => {})
    }, 
    test_login(){
      this.loginForm.username = ""
      this.loginForm.password = ""
    }
  }
}
</script>
<style>
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
