<script setup>
definePageMeta({
  layout: 'empty',
});

const route = useRoute();
const router = useRouter();

const keyword = ref('');

const result = ref('');
const search = async () => {
  window.open(`/learn/xss/reflected?keyword=${keyword.value}`);
};

const { res } = await useFetchApi('/api/xss/search', 'get', {
  keyword: route.query.keyword,
});

if (res) result.value = res;
</script>

<template>
  <div id="reflected-xss">
    <h1>Reflected XSS</h1>
    <XssNav />
    <div>
      <label for="search">검색</label>
      <input v-model="keyword" type="text" id="search" />

      <button @click="search">검색</button>
      <template v-if="result">
        <div>
          <span>검색어: </span>
          <p v-html="result"></p>
        </div>
        <div>
          <span>검색결과: </span>
          <p>...</p>
        </div>
      </template>
    </div>
  </div>
</template>
