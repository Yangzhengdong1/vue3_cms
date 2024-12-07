<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link" tabindex="-1">
        <el-avatar :size="35" :src="avatarUrl" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLoginout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Edit /></el-icon>
            <span>个人资料</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import localCache from "@/utils/local-cache";

  const store = useStore();
  const router = useRouter();

  const name = computed(() => store.state.login.userInfo.username);
  const avatarUrl = computed(
    () =>
      store.state.login.userInfo.avatarUrl ??
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  );

  const handleLoginout = () => {
    localCache.batchReomveCache([
      { cacheKey: "token", cacheType: "local" },
      { cacheKey: "userMenus", cacheType: "local" },
      { cacheKey: "userInfo", cacheType: "local" },
      { cacheKey: "userId", cacheType: "local" }
    ]);
    router.push("/login");
  };
</script>

<style lang="less" scoped>
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    outline: none;
    > span {
      margin-left: 10px;
    }
  }
</style>
