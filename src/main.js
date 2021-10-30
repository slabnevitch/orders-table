import Vue from 'vue'
import App from './App.vue'

import './assets/css/main.css';

import VModal from 'vue-js-modal'
import currencyFilter from './filters/currency.filter'
import dateFilter from './filters/date.filter'
import toFixedFilter from './filters/toFixed.filter'

Vue.use(VModal)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('toFixed', toFixedFilter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
