<template>
  <div class="box">
    <Suspense>
      <Button class="btn" name="vitefederation"></Button>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, onMounted } from 'vue'
onMounted(() => console.log(getCurrentInstance()))
const Button = defineAsyncComponent({
  loader: () => import('comp/Button'),
  suspensible: false
})
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>