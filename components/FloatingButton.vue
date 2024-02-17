<script lang="ts" setup>
import type { TitleInterSect } from '~/types';

const { $listen } = useNuxtApp();
const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);

const titleInfo = ref<TitleInterSect>({ intersecting: false });
$listen('title-intersecting', (v) => (titleInfo.value = v as TitleInterSect));

const scrollUp = () => {
  scroll({ top: 0, left: 0, behavior: 'smooth' });
};
</script>

<template>
  <div id="floating">
    <!-- 스크롤 up -->
    <button
      v-if="titleInfo.intersecting"
      @click="scrollUp"
      class="floating-btn scroll-up"
    >
      <font-awesome-icon :icon="['fas', 'chevron-up']" />
    </button>

    <template v-if="isLogin">
      <!-- 글 작성하기 -->
      <NuxtLink to="/write" class="floating-btn">
        <font-awesome-icon icon="pen-to-square" />
      </NuxtLink>

      <!-- 어드민 페이지 -->
      <NuxtLink to="/manage" class="floating-btn">
        <font-awesome-icon icon="gear" />
      </NuxtLink>
    </template>
  </div>
</template>
