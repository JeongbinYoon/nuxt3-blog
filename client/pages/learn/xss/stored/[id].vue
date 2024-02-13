<script setup>
definePageMeta({
  layout: 'empty',
});

const route = useRoute();

const postData = ref();
const getPost = async () => {
  const { res } = await useFetchApi('/api/xss/post', 'get', {
    id: route.params.id,
  });

  if (res) postData.value = res;
};

await getPost();
</script>

<template>
  <div id="stored-xss">
    <h1>Stored XSS</h1>
    <XssNav />
    <div>
      <div v-if="postData">
        <h2 for="title">{{ postData.title }}</h2>
        <p v-html="postData.contents"></p>
      </div>
    </div>
  </div>
</template>
