<template>
  <div id="app">
    <el-menu
      class="app-menu"
      :default-active="activeIndex"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      @select="handleSelect"
    >
      <el-menu-item
        :class="{ active: isActive(menu.path) }"
        v-for="menu in menus"
        :index="menu.index"
        :key="menu.name"
      >
        <router-link :to="menu.path">{{ menu.name }}</router-link>
      </el-menu-item>
    </el-menu>
    <router-view class="container"> </router-view>
    <footer class="footer">
      <a href="https://beian.miit.gov.cn/">沪ICP备2022018712号-1</a>
    </footer>
  </div>
</template>

<script>
// import microApp, { getActiveApps } from '@micro-zoe/micro-app'
// import config from './config'
import { removeDomScope } from '@micro-zoe/micro-app';

export default {
  name: 'App',
  data() {
    return {
      activeIndex: '/app1',
      menus: [
        {
          path: '/app1',
          name: 'child-vue3-cli',
          index: '/app1'
        },
        {
          path: '/app2',
          name: 'child-react',
          index: '/app2'
        },
        {
          path: '/app3',
          name: '图片添加水印',
          index: '/app3'
        },
        {
          path: '/app4',
          name: 'child-vue3',
          index: '/app4'
        }
      ]
    };
  },
  created() {
    this.getActiveIndex();
    window.addEventListener('popstate', () => this.getActiveIndex());
    removeDomScope();
  },
  methods: {
    getActiveIndex() {
      const pathname = location.pathname;
      this.activeIndex = pathname;
    },
    handleSelect(key) {
      // console.log(getActiveApps())
      this.activeIndex = key;
    },
    isActive(path) {
      return this.$route.path === path;
    }
  }
};
</script>

<style lang="stylus">
body
  margin 0
#app
  display flex
  flex 1
  position relative
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
.footer
  background #000
  height 100px
  width calc(100% - 200px)
  position absolute
  left 200px
  bottom 0
  display flex
  justify-content center
  align-items center
  a
    color #fff
</style>
