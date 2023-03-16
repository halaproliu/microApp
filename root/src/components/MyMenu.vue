<template>
  <el-menu-item
    :class="{ active: isActive(menu.path) }"
    v-for="menu in menus"
    :index="menu.index"
    :key="menu.name"
  >
    <router-link :to="menu.path">{{ menu.name }}</router-link>
  </el-menu-item>
</template>

<script>
export default {
  methods: {
    isActive(path) {
      return this.$route.path === path;
    }
  }
};
</script>
