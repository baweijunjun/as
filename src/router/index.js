import Vue from 'vue'
import Router from 'vue-router'
import Login from '.././pages/login/login.vue';
import Home from '.././pages/home/home.vue';
import One from '.././pages/one/one.vue';
import Three from '.././pages/three/three.vue';
import EmployeeAdmin from '.././pages/employee_admin/employee_admin.vue';
import User_admin from '.././pages/user_admin/user_admin.vue';
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component:Login,
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      children:[
        {
          name:"employee_admin",
          path:'employee_admin',
          component:EmployeeAdmin
        },
          {
          name:"user_admin",
          path:'user_admin',
          component:User_admin,
        },
          {
          path: '/one',
          name: 'One',
          component:One,
        },
        {
          path: '/three',
          name: 'Three',
          component:Three,
        },
      ]
    },
  ]
})
export default router;
