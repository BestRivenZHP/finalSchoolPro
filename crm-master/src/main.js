 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import iView from 'iview'
import store from './vuex/status'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import echarts from 'echarts'
import 'babel-polyfill'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'


Vue.use(VCharts)
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(Vuex)
Vue.use(ElementUI)
/*Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
   console.log(to);
   console.log(from);
   console.log(next);
   next();
})*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
function formatDate(date, fmt) {
  date = new Date(date);
  if (typeof(fmt) === "undefined") {
      fmt = "yyyy-MM-dd HH:mm:ss";
  }
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  }
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
      }
  }
  return fmt
};
 
//定义一个时间过滤器
Vue.filter("FormatDate", function(date, fmt) {
  return formatDate(date, fmt);
});


