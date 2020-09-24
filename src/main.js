import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import Element from 'element-ui';
import vueAxios from 'vue-axios';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'itoEzU0OpDZG7ksjY0r5e1FY6842xWnl'
})
Vue.use(vueAxios, axios)
//語言包
import zhcn from './lang/zh-CN';
import zhcn2 from './lang/zh-CN2';
//低版本瀏覽器兼容axios
// import promise from 'es6-promise';
// promise.polyfill();


// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/index.css'
import './style/init.css';
import './style/resetStyle.css';
import 'babel-polyfill';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  messages: {
    'zh-CN': zhcn2
  },
})


// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.component(CollapseTransition.name, CollapseTransition)


Vue.use(Element)

Vue.config.productionTip = false
// Vue.config.silent = true
Vue.prototype.$baseUrl = 'http://192.168.0.105:5288'
Vue.prototype.$baseUrl2 = 'http://192.168.0.105:5188'

Vue.directive('resize', {
  // 使用全局注册指令的方式
  // 指令的名称
  bind(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = "",
      height = "";

    function isReize() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value(); // 关键
      }
      width = style.width;
      height = style.height;
    }
    el.__vueSetInterval__ = setInterval(isReize, 300);
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__);
  },
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')