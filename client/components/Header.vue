<script lang="ts" setup>
import type { TitleInterSect } from '~/types';

const { $listen } = useNuxtApp();
const route = useRoute();

const titleInfo = ref<TitleInterSect>({ intersecting: false, postTitle: '' });

$listen('title-intersecting', (v) => {
  titleInfo.value = v as TitleInterSect;
});
</script>

<template>
  <header id="header">
    <p v-if="titleInfo.intersecting && route.name === 'post-id'" class="title">
      {{ titleInfo.postTitle }}
    </p>
    <p v-else class="title">개발 블로그</p>
  </header>
</template>

<style scoped>
@import '~/assets/css/reset.scss';
</style>
~/types
