<script lang="ts" setup>
const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
</script>

<template>
  <div v-if="isLogin" id="floating">
    <!-- 글 작성하기 -->
    <NuxtLink to="/write" class="floating-btn">
      <font-awesome-icon icon="pen-to-square" />
    </NuxtLink>

    <!-- 어드민 페이지 -->
    <NuxtLink to="/manage" class="floating-btn">
      <font-awesome-icon icon="gear" />
    </NuxtLink>
  </div>
</template>
