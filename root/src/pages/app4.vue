<template>
  <div>
    <h1>子应用</h1>
    <micro-app name='app4' :url='url' baseroute='/' @datachange="handleDataChange"></micro-app>
  </div>
</template>

<script>
import config from '../config'
export default {
  data () {
    return {
      url: `${config.app4}`
    }
  },
  methods: {
    handleDataChange(e) {
      console.log('来自子应用app4的数据', e.detail.data)
    }
  }
}
</script>