<script setup>
const { res } = await useFetchApi('/api/categories', 'get');
</script>
<template>
  <div id="category">
    <ul>
      <li>
        <NuxtLink to="/category/all">전체 글 보기</NuxtLink>
      </li>
      <li v-for="parent in res">
        <p class="parent">{{ parent.name }}</p>
        <ul>
          <li v-for="child in parent.list">
            <NuxtLink :to="`/category/${child.categoryId}`" class="child">{{
              child.name
            }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import '~/assets/css/reset.scss';
</style>
