<script setup>
import Editor from '~/components/editor';
const content = ref();
const title = ref('');

const submit = async () => {
  const params = {
    title: title.value,
    content: content.value,
    author: '2',
    category: '8',
  };
  await useFetchApi('api/post', 'post', {}, params);
};
</script>

<template>
  <div>
    <ClientOnly>
      <input v-model="title" />
      <Editor v-model="content" />
    </ClientOnly>
    <div>content is:{{ content }}</div>

    <button @click="submit">save</button>
  </div>
</template>
