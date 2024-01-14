<script setup>
const content = ref('');
const posts = ref('');

const onSubmit = async () => {
  posts.value = await useFetchApi('/api/post', 'get');
};
</script>

<template>
  <textarea v-model="content" placeholder="내용 입력"></textarea>
  <button @click="onSubmit">저장</button>
  <p>{{ posts }}</p>
  <nuxt-link to="/">index</nuxt-link>
</template>
