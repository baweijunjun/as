import Vue from 'vue'
import App from './App.vue'
import ElementUI,{Form,FormItem,Input} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from './router'
import http from './utils/http';
import store from './store';
Vue.use(http)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router:Router,
  store,
  render: h => h(App)
})