<script setup>
const route = useRoute();
const { res } = await useFetchApi('/api/post', 'get', {
  id: route.params.id,
});

const created = ref({});
created.value.date = res.created.split('T')[0];
created.value.time = res.created.split('T')[1].split('.')[0];

const deletePost = async () => {
  const answer = confirm('삭제하시겠습니까?');
  if (answer) {
    await useFetchApi('/api/post', 'delete', { id: route.params.id });
  }
};
</script>

<template>
  <div id="content">
    <h2 class="title">{{ res.title }}</h2>
    <span class="created">{{ `${created.date} ${created.time}` }}</span>
    <div v-html="res.content"></div>
    <button @click="deletePost">삭제</button>
  </div>
</template>
