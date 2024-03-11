<script lang="ts" setup>
const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
</script>

<template>
  <div id="sidebar">
    <div class="sidebar-content">
      <div id="profile">
        <NuxtLink to="/">
          <img src="" class="profile-img" />
          <span class="blog-name">개발 블로그</span>
        </NuxtLink>
        <span class="profile-name">JeongbinYoon</span>
      </div>
      <Category />
    </div>
    <ClientOnly>
      <button v-if="isLogin" class="logout-btn">
        <font-awesome-icon icon="right-from-bracket" />
      </button>
    </ClientOnly>
  </div>
</template>
