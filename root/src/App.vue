<template>
  <div id="app">
    <el-menu
      class="app-menu"
      :default-active="activeIndex"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      @select="handleSelect">
      <el-menu-item :class="{'active': isActive(menu.path)}" v-for="menu in menus" :index="menu.index" :key="menu.name">
        <router-link :to="menu.path">{{ menu.name }}</router-link>
      </el-menu-item>
    </el-menu>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import microApp, { getActiveApps } from '@micro-zoe/micro-app'
// import config from './config'

export default {
  name: 'App',
  data () {
    return {
      activeIndex: '/app1',
      menus: [{
        path: '/app1',
        name: 'app1',
        index: '/app1'
      }, 
      {
        path: '/app2',
        name: 'app2',
        index: '/app2'
      },
      {
        path: '/app3',
        name: 'app3',
        index: '/app3'
      }]
    }
  },
  methods: {
    handleSelect (key) {
      const obj = this.menus.find(menu => menu.index === key)
      console.log(getActiveApps())
      this.activeIndex = key
      microApp.setData(obj.name, { path: key })
    },
    isActive (path) {
      return this.$route.path === path
    }
  }
}
</script>

<style lang="stylus">
body
  margin 0
#app
  display flex
  flex 1
.app-menu
  width 200px
  height 100vh
  max-height 100vh
.el-menu
  text-align center
  a
    color #bfcbd9
    display block
.active
  a
    color #20a0ff
.container
  display block
  height 100vh
  overflow scroll
  width calc(100% - 200px)
</style>
