<template>
  <div>{{ txt }}</div>
  <Button></Button>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { ref, defineAsyncComponent } from 'vue'
import { loadComponent } from './utils/loadComponent'
const store = useStore()
const txt = ref('hello world')
// const Button = defineAsyncComponent(() => import('comp/Button'))
const Button = defineAsyncComponent({
  loader: () => loadComponent('comp', 'default', './Button', 'http://localhost:8010/remoteEntry.js')(),
  errorComponent: () => `<h2>load error</h2>`,
  onError: (error, retry, fail, attempts) => {
    console.log(error)
  }
})
console.log('Button: ', Button);

</script>

<style lang="stylus" scoped>

</style>