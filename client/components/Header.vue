<script setup>
const { $listen } = useNuxtApp();

const theme = ref(true);
const postIntersecInfo = ref({});

$listen('post-intersecting', (v) => (postIntersecInfo.value = v));
</script>

<template>
  <div id="header">
    <div class="max-container">
      <h1 class="logo">
        <NuxtLink to="/">blog</NuxtLink>
      </h1>
      <p v-if="postIntersecInfo.intersecting" class="title">
        {{ postIntersecInfo.postTitle }}
      </p>
      <div class="header-btns">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '~/assets/css/reset.scss';
</style>
