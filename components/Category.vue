<script setup>
const { res } = await useFetchApi('/api/categories', 'get');
</script>
<template>
  <div id="category">
    <ul>
      <li>
        <NuxtLink to="/category/all">전체 글 보기</NuxtLink>
      </li>
      <li v-for="group in res">
        <p class="group">{{ group.name }}</p>
        <ul>
          <li v-for="category in group.list">
            <NuxtLink :to="`/category/${category.categoryId}`" class="category">
              <span>{{ category.name }}</span>
              <span class="post-count"> {{ category.postCount }}개</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import '~/assets/css/reset.scss';
</style>
