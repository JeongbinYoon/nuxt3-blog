<script setup>
const { $listen } = useNuxtApp();
const route = useRoute();

const theme = ref(true);
const titleInfo = ref({});

$listen('title-intersecting', (v) => (titleInfo.value = v));
</script>

<template>
  <header id="header">
    <p v-if="titleInfo.intersecting && route.name === 'post-id'" class="title">
      {{ titleInfo.postTitle }}
    </p>
    <p v-else-if="!titleInfo.postTitle" class="title">개발 블로그</p>

    <!-- <div class="header-btns">
      <button>
        <ClientOnly>
          <font-awesome-icon icon="magnifying-glass" />
        </ClientOnly>
      </button>

      <button v-if="theme" @click="theme = !theme">
        <ClientOnly>
          <font-awesome-icon icon="moon" />
        </ClientOnly>
      </button>
      <button v-else @click="theme = !theme">
        <font-awesome-icon icon="lightbulb" />
      </button>

      <NuxtLink class="write-btn" to="/write"> 새 글 작성 </NuxtLink>
    </div> -->
  </header>
</template>

<style scoped>
@import '~/assets/css/reset.scss';
</style>
