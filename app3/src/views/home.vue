<template>
  <div class="box">
    <div class="mt-20">纯前端canvas添加水印</div>
    <div class="flex mt-20 mb-300">
      <div class="oper-area">
        <div class="oper-area-zone ml-20 mt-20">
          <el-upload :auto-upload="false" :show-file-list="false" :on-change="onUploadChange">
            <el-button type="primary">选择文件</el-button>
          </el-upload>
          <el-button class="ml-20" type="primary" @click="rotate">旋转</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
        <el-form class="ml-20 mt-20" label-suffix=":">
          <el-form-item label="水印文案">
            <el-input v-model="text" @change="setOptions"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker size="large" v-model="color" show-alpha @change="setOptions" />
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input v-model="fontsize" @change="setOptions"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="ml-20 mr-20">
        <canvas class="w-full" :ref="(el) => {ctxRef = el}" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Watermark from '../libs/watermark'
const example = new URL('../assets/example.jpg', import.meta.url).href

export default defineComponent({
  name: 'Home',
  setup () {
    const text = ref('买房专用')
    const color = ref('#000')
    const fontsize = ref(23)
    const opacity = ref(0.4)
    const ctxRef = ref(null)
    const watermark = ref(null)
    const init = () => {
      watermark.value = new Watermark(ctxRef.value)
      watermark.value.setOptions({text: text.value, fontSize: fontsize.value, fillStyle: color.value, watermarkWidth: 180, watermarkHeight: 280})
      watermark.value.draw(example)
    }

    const setOptions = () => {
      watermark.value.setOptions({text: text.value, fontSize: fontsize.value, fillStyle: color.value, watermarkWidth: 180, watermarkHeight: 280})
    }

    const onUploadChange = (file) => {
      const url = URL.createObjectURL(file.raw)
      watermark.value.draw(url)
    }

    const rotate = () => {
      watermark.value.rotate()
    }

    const save = () => {
      watermark.value.save()
    }

    onMounted(() => {
      init()
    })
    return {
      text,
      color,
      fontsize,
      opacity,
      ctxRef,
      rotate,
      save,
      setOptions,
      onUploadChange
    }
  }
})
</script>

<style scoped>
.box {
}
.flex {
  display: flex;
}
.w-full {
  width: 100%;
}
.w-60 {
  width: 60px;
}
.ml-20 {
  margin-left: 20px;
}
.mt-20 {
  margin-top: 20px;
}
.mr-20 {
  margin-right: 20px;
}
.mb-300 {
  margin-bottom: 300px;
}
.oper-area-zone {
  display: flex;
}

</style>
