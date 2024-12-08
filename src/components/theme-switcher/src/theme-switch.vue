<template>
  <div class="theme-switch">
    <span @click="handleChangeTheme">{{ currentTheme }}</span>
  </div>
</template>

<script setup lang="ts">
  import localCache from "@/utils/local-cache";
  import { onMounted, ref } from "vue";

  type Theme = "light" | "dark";

  const currentTheme = ref<Theme>("light"); // dark

  onMounted(() => {
    const localTheme = localCache.getCache("theme", "local") || "light";
    currentTheme.value = localTheme;
    applyTheme();
  });

  const applyTheme = () => {
    const html = document.documentElement;
    // html.classList.add("light");
    localCache.setCache("theme", currentTheme.value, "local");
    currentTheme.value === "dark"
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  };

  const handleChangeTheme = () => {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
    applyTheme();
  };
</script>

<style scoped lang="less">
  .theme-switch {
    position: fixed;
    top: 0;
    left: 100px;
  }
</style>
