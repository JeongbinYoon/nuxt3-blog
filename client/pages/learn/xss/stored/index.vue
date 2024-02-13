<script setup>
definePageMeta({
  layout: 'empty',
});

const title = ref('');
const contents = ref('');

const posts = ref([]);
const getPosts = async () => {
  const { res } = await useFetchApi('/api/xss/posts', 'get');
  if (res.data) posts.value = res.data;
};

const submit = async () => {
  const params = {
    title: title.value,
    contents: contents.value,
  };
  await useFetchApi('/api/xss/post', 'post', {}, params);
  getPosts();
};

const deletePost = async (id) => {
  await useFetchApi('/api/xss/post', 'delete', { id });
  getPosts();
};

await getPosts();
</script>

<template>
  <div id="stored-xss">
    <h1>Stored XSS</h1>
    <XssNav />

    <div>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <NuxtLink :to="`/learn/xss/stored/${post.id}`">
            {{ post.title }}
          </NuxtLink>
          <ClientOnly>
            <button class="icon" @click="() => deletePost(post.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </ClientOnly>
        </li>
      </ul>
      <div>
        <label for="title">제목</label>
        <input v-model="title" type="text" id="title" />

        <label for="contents">내용</label>
        <textarea
          v-model="contents"
          id="contents"
          cols="30"
          rows="10"
        ></textarea>

        <button @click="submit">저장</button>
      </div>
    </div>
  </div>
</template>
