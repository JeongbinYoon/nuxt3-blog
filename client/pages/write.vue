<script setup>
import Editor from '~/components/editor';
definePageMeta({
  layout: 'write',
});

const popVisible = ref({
  visible: false,
});

const categories = ref([]);

// 글 정보
const postInfo = ref({
  isUpdate: false,
  postId: useRoute().query?.postId,
  title: '',
  contents: '',
  preview: '',
  category: '',
});

// 글 수정시 내용 불러오기
if (postInfo.value.postId) {
  postInfo.value.isUpdate = true;
  const { res, status } = await useFetchApi('/api/post', 'get', {
    id: postInfo.value.postId,
  });

  if (status === 'ok') {
    postInfo.value.title = res.title;
    postInfo.value.contents = res.contents;
    postInfo.value.preview = res.preview;
    postInfo.value.category = res.category;
  }
}

// 카테고리 불러오기
const { res: categoriesData, status: status2 } = await useFetchApi(
  '/api/categories',
  'get'
);
if (status2 === 'ok') {
  categories.value = categoriesData;
}

// 카테고리 선택
const categoryChange = (e) => {
  postInfo.value.category = e.target.value;
};

// validate
const validate = () => {
  if (!postInfo.value.title) {
    alert('제목을 입력하세요.');
    return;
  }

  if (!postInfo.value.category) {
    alert('카테고리를 선택하세요.');
    return;
  }
  return true;
};

// 게시하기
const onComplete = () => {
  if (!validate()) return;

  popVisible.value.visible = true;
};
</script>

<template>
  <div id="write">
    <div class="content-container">
      <ClientOnly>
        <!-- 카테고리 -->
        <select
          v-model="postInfo.category"
          @change="categoryChange"
          class="category-select"
        >
          <option value="">카테고리 선택</option>
          <optgroup v-for="group in categories" :label="group.name">
            <option v-for="category in group.list" :value="category.categoryId">
              {{ category.name }}
            </option>
          </optgroup>
        </select>

        <!-- 제목 -->
        <textarea
          class="title-input"
          v-model="postInfo.title"
          placeholder="제목을 입력하세요"
          autofocus
          required
        ></textarea>

        <!-- 에디터 -->
        <Editor v-model="postInfo.contents" />
      </ClientOnly>

      <div class="btn-group">
        <button @click="onTmpStorage" class="btn btn-white">임시저장</button>
        <button @click="onComplete" class="btn btn-primary">완료</button>
      </div>
    </div>

    <Publish :pop-visible="popVisible" :post-info="postInfo" />
  </div>
</template>
