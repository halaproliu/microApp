<template>
  <div>
    <micro-app name='app3' :url='url' inline disablesandbox @created='handleCreate' @mounted='handleMount'></micro-app>
  </div>
</template>

<script>
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'
// import config from '../config'

// 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForAppNameVite = new EventCenterForMicroApp('app3')
export default {
  data () {
    return {
      url: process.env.VUE_APP_APP3
    }
  },
  methods: {
    handleCreate () {
      console.log('app3 创建了')
    },
    handleMount () {
      console.log('app3 已经渲染完成')

      setTimeout(() => {
        this.microAppData = {msg: '来自基座的新数据'}
      }, 2000)
    }
  }
}
</script>