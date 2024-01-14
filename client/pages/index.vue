<script setup>
const data = await useFetchApi('/api/posts', 'get');
const categories = await useFetchApi('/api/categories', 'get');
</script>

<template>
  <p>main</p>
</template>
