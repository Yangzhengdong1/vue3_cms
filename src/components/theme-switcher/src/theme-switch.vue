<template>
  <div class="theme-switch">
    <el-icon @click="handleChangeTheme" size="40" :color="iconColor">
      <!-- <transition name="el-fade-in-linear"> -->
      <component :is="iconName" />
      <!-- </transition> -->
    </el-icon>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import localCache from "@/utils/local-cache";

  onMounted(() => {
    const localTheme = localCache.getCache("theme", "local") || "light";
    currentTheme.value = localTheme;
    applyTheme();
  });

  type Theme = "light" | "dark";

  const currentTheme = ref<Theme>("light"); // dark
  const iconName = computed(() =>
    currentTheme.value === "dark" ? "Sunny" : "Moon"
  );
  const iconColor = computed(() =>
    iconName.value === "Sunny"
      ? "var(--v-sunny-icon-color)"
      : "var(--v-moon-icon-color)"
  );

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
    right: 20%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: 0.3s linear;

    &:hover {
      transform: translate(-50%, 0);
    }
  }
</style>
