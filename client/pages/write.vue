<script setup>
definePageMeta({
  layout: 'write',
});
import Editor from '~/components/editor';

const route = useRoute();
const router = useRouter();

const isUpdate = ref(false);
const categories = ref([]);

// 글 정보
const postId = ref(route.query?.postId);
const title = ref('');
const content = ref();
const category = ref('');

// 글 수정시 내용 불러오기
if (postId.value) {
  isUpdate.value = true;
  const { res, status } = await useFetchApi('/api/post', 'get', {
    id: postId.value,
  });

  if (status === 'ok') {
    title.value = res.title;
    content.value = res.content;
    category.value = res.category;
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
  category.value = e.target.value;
};

// validate
const validate = () => {
  if (!title.value) {
    alert('제목을 입력하세요.');
    return;
  }

  if (!category.value) {
    alert('카테고리를 선택하세요.');
    return;
  }
  return true;
};

// 게시하기
const onPublish = async () => {
  if (!validate()) return;

  let httpMethod = isUpdate.value ? 'put' : 'post';
  const query = isUpdate ? { id: postId.value } : null;
  const params = {
    title: title.value,
    content: content.value,
    author: '2',
    category: category.value,
  };

  const { res, status } = await useFetchApi(
    'api/post',
    httpMethod,
    query,
    params
  );

  let alertMsg = res.msg;
  alert(alertMsg);

  if (status === 'ok') {
    let id = isUpdate.value ? postId.value : res.postId;
    router.push(`/post/${id}`);
  }
};
</script>

<template>
  <div id="write">
    <div class="content-container">
      <ClientOnly>
        <!-- 카테고리 -->
        <select
          v-model="category"
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
          v-model="title"
          placeholder="제목을 입력하세요"
          autofocus
          required
        ></textarea>

        <!-- 에디터 -->
        <Editor v-model="content" />
      </ClientOnly>

      <div class="btn-group">
        <button @click="onTmpStorage" class="btn btn-white">임시저장</button>
        <button @click="onPublish" class="btn btn-primary">
          {{ isUpdate ? '수정하기' : '게시하기' }}
        </button>
      </div>
    </div>
  </div>
</template>
