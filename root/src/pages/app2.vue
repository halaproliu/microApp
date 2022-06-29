<template>
  <div>
    <micro-app name='app2' :url='url' baseroute='/'></micro-app>
  </div>
</template>

<script>
import config from '../config'
export default {
  data () {
    return {
      url: `${config.app2}`
    }
  }
}
</script>