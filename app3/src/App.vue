<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
// 子应用内部跳转时，通知侧边栏改变菜单状态
const onRouteChange = () => {
  if (window.eventCenterForAppNameVite) {
    // 发送全局数据，通知侧边栏修改菜单展示
    window.eventCenterForAppNameVite.setGlobalData({ name: 'app3' })
  }
}
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <div id='public-links' @click="onRouteChange">
    <router-link to="/">Home</router-link> |
    <router-link to="/page2">Page2</router-link>
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
