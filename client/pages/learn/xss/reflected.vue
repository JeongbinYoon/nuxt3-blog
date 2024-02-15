<script setup>
definePageMeta({
  layout: 'empty',
});

const route = useRoute();
const router = useRouter();

const keyword = ref('');
</script>

<template>
  <div id="reflected-xss">
    <h1>Reflected XSS</h1>
    <XssNav />
    <div>
      <label for="search">검색</label>
      <input v-model="keyword" type="text" id="search" />
      <button
        @click="
          router.push({
            path: '/learn/xss/reflected',
            query: { keyword },
          })
        "
      >
        검색
      </button>
      <div>
        <span>검색어: </span>
        <p v-html="route.query.keyword"></p>
      </div>
    </div>
  </div>
</template>
