<template>
  <div>
    <h1>app3 page</h1>
    <div class="app3-test-btn">test</div>
    <img :src="microAppLogo" alt="micro-app-logo" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
const microAppLogo = new URL('../assets/micro-app-logo.png', import.meta.url).href

export default defineComponent({
  name: 'page2',
  setup () {
    return { microAppLogo }
  }
})
</script>

<style>
.app3-test-btn {
  height: 40px;
  width: 100px;
  background-color: red;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  font-weight: bolder;
  margin: 0 auto;
  user-select: none;
}
</style>
