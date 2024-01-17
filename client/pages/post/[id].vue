<script setup>
const route = useRoute();
const router = useRouter();
const { res } = await useFetchApi('/api/post', 'get', {
  id: route.params.id,
});

const created = ref({});
created.value.date = res.created.split('T')[0];
created.value.time = res.created.split('T')[1].split('.')[0];

const deletePost = async () => {
  const answer = confirm('삭제하시겠습니까?');
  if (answer) {
    const { status } = await useFetchApi('/api/post', 'delete', {
      id: route.params.id,
    });
    if (status === 'ok') {
      router.push('/');
    }
  }
};
</script>

<template>
  <div class="post" id="content">
    <h2 class="title">{{ res.title }}</h2>
    <div class="flex">
      <span class="created">{{ `${created.date} ${created.time}` }}</span>
      <div class="btn-group">
        <button @click="$router.push(`/write?postId=${route.params.id}`)">
          수정
        </button>
        <button @click="deletePost">삭제</button>
      </div>
    </div>
    <div v-html="res.content"></div>
  </div>
</template>
