import { createApp, App as AppInstance } from 'vue'
import { createRouter, createWebHashHistory, RouterHistory, Router } from 'vue-router'
import App from './App.vue'
import routes from './router'
import { createPinia } from 'pinia'
// import 'vue-global-api'

declare global {
  interface Window {
    eventCenterForAppNameVite: any
    microApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
  }
}

// 与基座进行数据交互
function handleMicroData (router: Router) {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('app4 getData:', window?.microApp?.getData())

    // 监听基座下发的数据变化
    window?.microApp.addDataListener((data: Record<string, unknown>) => {
      console.log('app4 addDataListener:', data)

      // 当基座下发path时进行跳转
      if (data.path && data.path !== router.currentRoute.value.path) {
        router.push(data.path as string)
      }
    })

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ myname: 'app4' })
    }, 3000)
  }
}

let app: AppInstance | null = null
let router: Router | null = null
let history: RouterHistory | null = null
function mount() {
  app = createApp(App)
  history = createWebHashHistory()
  router = createRouter({
    history,
    routes,
  })
  const pinia = createPinia()
  app.use(pinia)
  app.mount('#app4')
  handleMicroData(router)
}

// 将卸载操作放入 unmount 函数
function unmount () {
  app?.unmount()
  history?.destroy()
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener()
  app = null
  router = null
  history = null
  console.log('微应用app4卸载了')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}