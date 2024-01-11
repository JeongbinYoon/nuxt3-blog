<script setup>
const data = await useFetchApi('/api/posts/post', 'get');
</script>

<template>
  <p>main</p>
  <nuxt-link to="/manage/newpost/">newpost</nuxt-link>
  {{ data }}
</template>
