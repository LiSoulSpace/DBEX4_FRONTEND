import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '../components/home/AppIndex'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login.vue'
import OpClassTable from "../components/home/OpClassTable"
import OpSCTable from '../components/home/OpSCTable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/opclass',
      name: 'OperateClassTable',
      component: OpClassTable,
      meta:{
        requireAuth: true
      }
    },{
      path: '/opsc',
      name: 'OperateSCTable',
      component: OpSCTable,
      meta:{
        requireAuth: true
      }
    }
  ]
})
