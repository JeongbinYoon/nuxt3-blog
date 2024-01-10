<script setup>
const content = ref('');

const onSubmit = async () => {
  await useFetchApi('/api/posts/post', 'get');
};
</script>

<template>
  <textarea v-model="content" placeholder="내용 입력"></textarea>
  <button @click="onSubmit">저장</button>
</template>
