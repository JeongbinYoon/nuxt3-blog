<script setup>
const route = useRoute();
const { res } = await useFetchApi('/api/posts', 'get', {
  categoryId: route.params.id,
});
</script>

<template>
  <div class="content-padding">
    <PostsList :posts="res" />
  </div>
</template>
