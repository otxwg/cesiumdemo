import Vue from 'vue'
import ElementUI from 'element-ui'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(ElementUI, {
  zhLocale
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
