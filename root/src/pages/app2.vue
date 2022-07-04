<template>
  <div>
    <micro-app name='app2' :url='url' baseroute='/'></micro-app>
  </div>
</template>

<script>
// import config from '../config'
export default {
  data () {
    return {
      url: process.env.VUE_APP_APP2
    }
  }
}
</script>