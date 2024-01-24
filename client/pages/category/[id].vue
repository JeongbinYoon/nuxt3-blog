<script setup>
const route = useRoute();
const { res } = await useFetchApi('/api/posts', 'get', {
  categoryId: route.params.id,
});
</script>

<template>
  <div class="content-container">
    <PostsList :posts="res" />
  </div>
</template>
