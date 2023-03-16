<template>
  <div id="app">
    <svg width="300" height="300">
      <circle
        ref="el"
        class="around"
        cx="150"
        cy="150"
        r="100"
        fill="transparent"
        stroke-width="12"
        stroke="grey"
      ></circle>
      <text
        x="150"
        y="150"
        font-size="24"
        fill="grey"
        text-anchor="middle"
        alignment-baseline="middle"
      >
        {{ percent }}
      </text>
    </svg>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
export default {
  setup() {
    let timer;
    const el = ref(null);
    let percent = ref(0);
    const loadingArr = [];
    for (let i = 1; i <= 100; i++) {
      loadingArr.push(i);
    }
    let index = 0;
    onMounted(() => {
      const oLength = el?.value?.getTotalLength();
      timer = setInterval(() => {
        el.value.style['stroke-dashoffset'] =
          oLength - oLength * (loadingArr[index] / 100);
        percent.value = `${loadingArr[index]}%`;
        index++;
        if (index === loadingArr.length) {
          clearInterval(timer);
          // percent.value = '加载完毕';
        }
      }, 50);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });
    return {
      el,
      percent
    };
  }
};
</script>

<style>
.around {
  stroke-dasharray: 628;
  stroke-dashoffset: 628;
  transition: all 0.5s;
}
</style>
