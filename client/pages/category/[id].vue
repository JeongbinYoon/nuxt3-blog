<script setup>
const route = useRoute();
const { res } = await useFetchApi('/api/posts', 'get', {
  categoryId: route.params.id,
});
</script>

<template>
  <div>
    <PostsList :posts="res" />
  </div>
</template>
