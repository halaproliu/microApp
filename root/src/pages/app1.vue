<template>
  <div>
    <h1>子应用</h1>
    <micro-app name='app1' :url='url' baseroute='/'></micro-app>
  </div>
</template>

<script>
import config from '../config'
export default {
  data () {
    return {
      url: `${config.app1}`
    }
  },
  created () {
    console.log(1111111)
  }
}
</script>