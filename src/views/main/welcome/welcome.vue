<template>
  <div class="welcome">
    <div class="welcome-content">
      <h1 class="welcome-title">
        <span
          v-for="(char, index) in chars"
          :key="index"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          {{ char }}
        </span>
      </h1>
      <p class="welcome-message">
        Manage your system with ease and efficiency.
      </p>
      <!-- <a href="/dashboard" class="enter-btn">Go to Dashboard</a> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  const text = "Welcome to the Admin Dashboard";
  const chars = text.split("");
</script>

<style scoped lang="less">
  .welcome {
    height: calc(100vh - 90px);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(
      --el-table-header-background
    ); /* Light gray background */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    text-align: center;
    border-radius: 5px;

    .welcome-content {
      background-color: var(--el-background-color);
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
    }

    .welcome-title {
      font-size: 32px;
      color: var(--el-text-color-bold);
      margin-bottom: 20px;
      font-weight: 600;
      white-space: pre;
    }
    .welcome-title span {
      opacity: 0;
      animation: fadeIn 0.5s forwards;
      display: inline-block;
      margin-right: 2px; /* Small space between characters */
    }

    .welcome-message {
      font-size: 18px;
      color: var(--el-text-color-placeholder);
      margin-bottom: 30px;
    }

    .enter-btn {
      font-size: 16px;
      text-decoration: none;
      color: #ffffff;
      background-color: var(--el-btn-background-color); /* Subtle green color */
      padding: 12px 30px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease;
    }

    .enter-btn:hover {
      background-color: var(
        --el-btn-hover-background-color
      ); /* Darker green on hover */
    }

    .enter-btn:active {
      transform: translateY(2px);
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(10px); /* Start slightly lower */
      }
      100% {
        opacity: 1;
        transform: translateY(0); /* Finish at the normal position */
      }
    }
  }
</style>
