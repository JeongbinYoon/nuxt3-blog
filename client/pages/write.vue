<script setup>
definePageMeta({
  layout: 'write',
});
import Editor from '~/components/editor';

const router = useRouter();
const content = ref();
const title = ref('');

const validate = () => {
  if (!title.value) {
    alert('제목을 입력하세요');
    return;
  }
  return true;
};

const submit = async (e) => {
  if (!validate()) return;

  const params = {
    title: title.value,
    content: content.value,
    author: '2',
    category: '8',
  };

  const { res, status } = await useFetchApi('api/post', 'post', {}, params);
  if (status === 'ok') {
    alert('새 글이 게시되었습니다.');
    router.push(`/post/${res.postId}`);
  }
};
</script>

<template>
  <div id="write">
    <div class="content-container">
      <ClientOnly>
        <!-- 제목 -->
        <textarea
          class="title-input"
          v-model="title"
          placeholder="제목을 입력하세요"
          autofocus
          required
        ></textarea>
        <!-- 에디터 -->
        <Editor v-model="content" />
      </ClientOnly>

      <div class="btn-group">
        <button @click="submit" class="btn btn-white">임시저장</button>
        <button @click="submit" class="btn btn-primary">게시하기</button>
      </div>
    </div>
  </div>
</template>
