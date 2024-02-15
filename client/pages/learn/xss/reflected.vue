<script setup>
definePageMeta({
  layout: 'empty',
});

const route = useRoute();
const router = useRouter();

const keyword = ref('');

const search = () => {
  window.open(`/learn/xss/reflected?keyword=${keyword.value}`);
};
</script>

<template>
  <div id="reflected-xss">
    <h1>Reflected XSS</h1>
    <XssNav />
    <div>
      <label for="search">검색</label>
      <input v-model="keyword" type="text" id="search" />

      <button @click="search">검색</button>
      <div>
        <span>검색어: </span>
        <p v-html="route.query.keyword"></p>
      </div>
    </div>
  </div>
</template>
