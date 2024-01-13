<script setup>
const route = useRoute();
const { res } = await useFetchApi('/api/posts/post', 'get', {
  id: route.params.id,
});
</script>

<template>
  <div v-html="res.content"></div>
</template>
