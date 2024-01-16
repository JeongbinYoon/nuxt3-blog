<script setup>
definePageMeta({
  layout: 'write',
});
import Editor from '~/components/editor';
const content = ref();
const title = ref('');

const submit = async (e) => {
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
  <div id="write">
    <div class="content-container">
      <ClientOnly>
        <textarea
          class="title-input"
          v-model="title"
          placeholder="제목을 입력하세요"
          autofocus
          required
        ></textarea>
        <Editor v-model="content" />
      </ClientOnly>

      <div class="btn-group">
        <button @submit="submit" class="btn btn-white">임시저장</button>
        <button @submit="submit" class="btn btn-primary">게시하기</button>
      </div>
    </div>
  </div>
</template>
