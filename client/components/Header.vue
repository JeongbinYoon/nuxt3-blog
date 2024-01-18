<script setup>
const theme = ref(true);
const changeTheme = () => (theme.value = !theme.value);
</script>

<template>
  <div id="header">
    <div class="max-container flex justify-sb align-c">
      <h1 class="logo">
        <NuxtLink to="/">blog</NuxtLink>
      </h1>
      <p class="title">타틀타이틀이타이틀타</p>
      <div class="header-btns">
        <button>
          <font-awesome-icon icon="magnifying-glass" />
        </button>

        <button v-if="theme" @click="theme = !theme">
          <font-awesome-icon icon="moon" />
        </button>
        <button v-else @click="theme = !theme">
          <font-awesome-icon icon="lightbulb" />
        </button>

        <NuxtLink class="write-btn" to="/write"> 새 글 작성 </NuxtLink>
      </div>
    </div>
  </div>
</template>
