<script setup>
const route = useRoute();
const { res } = await useFetchApi('/api/posts/post', 'get', {
  id: route.params.id,
});

const created = ref({});
created.value.date = res.created.split('T')[0];
created.value.time = res.created.split('T')[1].split('.')[0];
</script>

<template>
  <div id="content">
    <h2 class="title">{{ res.title }}</h2>
    <span class="created">{{ `${created.date} ${created.time}` }}</span>
    <div v-html="res.content"></div>
  </div>
</template>
