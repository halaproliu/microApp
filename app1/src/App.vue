<template>
  <div>
    child-vue3
    <el-button type="primary" @click="toPath('/app2')">跳转child-react</el-button>
    <el-button type="primary" @click="transferData">传递数据到基座</el-button>
    <Button name="zhangsan"></Button>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { loadComponent } from './utils/loadComponent'

const Button = defineAsyncComponent({
  loader: () => loadComponent('comp', 'default', './Button', 'http://localhost:8010/remoteEntry.js')(),
  errorComponent: () => `<h2>load error</h2>`,
  onError: (error, retry, fail, attempts) => {
    console.log(error)
  }
})

const toPath = (path) => {
  window.history.pushState(null, '', `#${path}`)

// 主动触发一次popstate事件
  window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
}

const transferData = () => {
  window.microApp.dispatch({ type: 'from app1' })
}
</script>

<style lang="scss">
</style>
