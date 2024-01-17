<script setup>
definePageMeta({
  layout: 'write',
});
import Editor from '~/components/editor';

const route = useRoute();
const router = useRouter();

const isUpdate = ref(false);
const title = ref('');
const content = ref();

// 글 수정시 내용 불러오기
if (route.query?.postId) {
  isUpdate.value = true;
  const { res, status } = await useFetchApi('/api/post', 'get', {
    id: route.query.postId,
  });

  console.log('res', res);
  if (status === 'ok') {
    title.value = res.title;
    content.value = res.content;
    console.log('res', res);
  }
}

const validate = () => {
  if (!title.value) {
    alert('제목을 입력하세요');
    return;
  }
  return true;
};

// 게시하기
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

console.log('isUpdate', isUpdate.value);
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
        <button v-if="isUpdate" @click="submit" class="btn btn-primary">
          수정하기
        </button>
        <button v-else @click="submit" class="btn btn-primary">게시하기</button>
      </div>
    </div>
  </div>
</template>
