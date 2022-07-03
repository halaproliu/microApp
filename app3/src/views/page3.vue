<template>
  <div class="box">
    <Button class="btn" name="vitefederation"></Button>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const Button =  defineAsyncComponent(() => import('comp/Button'))
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>