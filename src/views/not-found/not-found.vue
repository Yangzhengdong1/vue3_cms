<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">
        Oops! The page you're looking for cannot be found.
      </p>
      <a @click="handleBack" class="home-link">Go Back to Homepage</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from "@/router";
  import localCache from "@/utils/local-cache";
  const lastPath = localCache.getCache("lastPath", "local");
  const handleBack = () => router.replace({ path: lastPath });
</script>

<style scoped lang="less">
  .not-found {
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
  }

  .not-found-content {
    background-color: var(--el-background-color);
    padding: 40px;
    // border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    // max-width: 600px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .not-found-title {
    font-size: 120px;
    color: var(--el-color-danger); /* Tomato color for emphasis */
    margin-bottom: 20px;
  }

  .not-found-message {
    font-size: 18px;
    color: var(--el-text-color-secondary);
    margin-bottom: 30px;
  }

  .home-link {
    font-size: 18px;
    color: var(--el-color-primary);
    text-decoration: none;
    padding: 10px 20px;
    border: 2px solid var(--el-color-primary);
    border-radius: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .home-link:hover {
    background-color: var(--el-color-primary);
    color: #fff;
  }
</style>
