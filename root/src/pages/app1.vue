<template>
  <div>
    <micro-app
      name="app1"
      :url="url"
      baseroute="/app1"
      @datachange="handleDataChange"
    ></micro-app>
  </div>
</template>

<script>
// import config from '../config'
export default {
  data() {
    return {
      url: process.env.VUE_APP_APP1
    };
  },
  methods: {
    handleDataChange(e) {
      console.log('来自子应用app1的数据', e.detail.data);
    }
  }
};
</script>
