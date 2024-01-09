<script setup>
const { data, error } = await useFetch('/api/');
</script>

<template>
  <p>main</p>
  <nuxt-link to="/manage/newpost/">newpost</nuxt-link>
</template>
