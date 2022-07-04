<template>
  <el-config-provider :size="size" :z-index="zIndex">
    child-vue3
    <el-button type="primary" @click="toPath('/app2')">跳转child-react</el-button>
    <el-button type="primary" @click="transferData">传递数据到基座</el-button>
    <Button name="zhangsan" style="margin-left: 40px"></Button>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider, ElButton } from 'element-plus'
import { ref, defineAsyncComponent } from 'vue'
import { loadComponent } from './utils/loadComponent'

const size = ref('medium')
const zIndex = ref(3000)

const Button = defineAsyncComponent({
  loader: () => loadComponent('comp', 'default', './Button', `${process.env.VUE_APP_COMP_HOST}/remoteEntry.js`)(),
  errorComponent: () => `<h2>load error</h2>`,
  onError: (error) => {
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
