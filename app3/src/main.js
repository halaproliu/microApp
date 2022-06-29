import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router'
import App from './App.vue'

function handleMicroData (router) {
  if (window.eventCenterForAppNameVite) {
    // 主动获取基座下发的数据
    console.log('app3 getData:', window.eventCenterForAppNameVite.getData())

    // 监听基座下发的数据变化
    window.eventCenterForAppNameVite.addDataListener((data) => {
      console.log('app3 addDataListener:', data)

      if (data.path && typeof data.path === 'string') {
        data.path = data.path.replace(/^#/, '')
        console.log(data.path);
        console.log(router.currentRoute.value.path);
        // 当基座下发path时进行跳转
        if (data.path && data.path !== router.currentRoute.value.path) {
          router.push(data.path)
        }
      }
    })

    // 向基座发送数据
    setTimeout(() => {
      window.eventCenterForAppNameVite.dispatch({ myname: 'app3' })
    }, 3000)
  }
}

let app
let router
let history

function mount() {
  history = createWebHashHistory()
  router = createRouter({
    history,
    routes,
  })

  app = createApp(App)
  app.use(router)
  app.mount('#vite-app')

  console.log('微应用app3渲染了')

  handleMicroData(router)
}

function unmount() {
  app?.unmount()
  history?.destroy()
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener()
  app = null
  router = null
  history = null
  console.log('微应用app3卸载了')
}


// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window[`micro-app-app3`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}