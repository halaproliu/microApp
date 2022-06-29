import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import microApp from '@micro-zoe/micro-app'

Vue.config.productionTip = false
Vue.use(ElementUI)

microApp.start({
  plugins: {
    modules: {
      app2: [{
        loader(code) {
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            code = code.replace('window.location.port', 8002)
          }
          return code
        }
      }],
      app3: [{
        loader(code) {
          if (process.env.NODE_ENV === 'development') {
            // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
            code = code.replace(/(from|import)(\s*['"])(\/app3\/)/g, all => {
              return all.replace('/app3/', 'http://localhost:8003/app3/')
            })
          }

          return code
        }
      }]
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
