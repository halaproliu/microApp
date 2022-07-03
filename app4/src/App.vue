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
const txt = ref('手动搭建vue项目')
// const Button = defineAsyncComponent(() => import('comp/Button'))
const Button = defineAsyncComponent({
  loader: () => loadComponent('comp', 'default', './Button', `${process.env.COMP_HOST}/remoteEntry.js`)(),
  errorComponent: () => `<h2>load error</h2>`,
  onError: (error) => {
    console.log(error)
  }
})
console.log('Button: ', Button);

</script>

<style lang="stylus" scoped>

</style>