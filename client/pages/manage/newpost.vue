<script setup>
const content = ref('');

const onSubmit = async () => {
  const params = {
    title: '타이틀',
    content: content.value,
  };

  await useFetchApi('/api/posts/post', 'post', params);
};
</script>

<template>
  <textarea v-model="content" placeholder="내용 입력"></textarea>
  <button @click="onSubmit">저장</button>
</template>
