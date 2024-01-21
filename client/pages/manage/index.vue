<script lang="ts" setup>
definePageMeta({
  layout: 'manage',
});

const { res } = await useFetchApi('/api/categories', 'get');

const categoryGroup = ref({
  parentId: '',
  categoryId: '',
});

const newCategoryName = ref('');
</script>

<template>
  <div>
    <h2>카테고리 수정</h2>

    <!-- 대분류 -->
    <select v-model="categoryGroup.parentId">
      <option value="">대분류 선택</option>
      <option v-for="group in res" :value="group.id">
        {{ group.name }}
      </option>
    </select>

    <!-- 카테고리 -->
    <select v-if="categoryGroup.parentId">
      <option value="">카테고리 선택</option>
      <option
        v-for="category in res.find((el) => el.id == categoryGroup.parentId)
          .list"
        value=""
      >
        {{ category.name }}
      </option>
    </select>

    <div>
      <input type="text" :value="newCategoryName" />
      <button>이름변경</button>
      <button>삭제</button>
      <button>추가</button>
    </div>

    <div>
      <ul>
        <li v-for="parent in res">
          <p class="parent">{{ parent.name }}</p>
          <ul>
            <li v-for="child in parent.list">
              {{ child.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import '~/assets/css/reset.scss';
</style>
