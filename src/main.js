import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalMixins from './mixins/globalMinins.js'

import '@/assets/css/_basic.less'
import '@/assets/css/global.less'
import 'vxe-table/lib/style.css'
import '@/plugins/antd.js'
import '@/plugins/element.js'
import '@/plugins/vxe-table.js'

Vue.config.productionTip = false

Vue.mixin(globalMixins)

Vue.filter('dateFormat', function (originVal, tag = false, full = false) {
  const dt = new Date(originVal)

  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const day = (dt.getDay() + '').padStart(2, '0')

  const hour = (dt.getHours() + '').padStart(2, '0')
  const minute = (dt.getMinutes() + '').padStart(2, '0')
  const second = (dt.getSeconds() + '').padStart(2, '0')
  if (!tag) {
    if (full) {
      return `${year}-${month}-${day}`
    } else {
      return `${month}月${day}日 ${hour}:${minute}`
    }
  } else {
    if (!full) {
      return `${minute}:${second}`
    } else {
      return `${hour}:${minute}`
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
