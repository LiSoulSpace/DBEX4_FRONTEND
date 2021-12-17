<template>
  <div>
    <div class="hello">
      <el-button v-on:click="jump">点击登陆</el-button>
      <br>
    </div>

  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    jump () {
      this.$router.push('login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.footer {
  position: absolute;
  top: 90%;
  width: 100%;
  height: 30px;
}
</style>
