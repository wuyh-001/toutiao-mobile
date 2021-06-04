import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';

// 设置rem基准值（html字体）
import 'amfe-flexible';

// 全局样式文件
import './styles/index.less'

import './utils/dayjs'


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
