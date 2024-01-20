<script setup>
const route = useRoute();
const router = useRouter();
const { $emit } = useNuxtApp();

const emit = defineEmits(['post-intersecting']);

// 글 정보 불러오기
const { res } = await useFetchApi('/api/post', 'get', {
  id: route.params.id,
});

// 날짜
const created = ref({});
created.value.date = res.created.split('T')[0];
created.value.time = res.created.split('T')[1].split('.')[0];

//  글 삭제
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

// 글 스크롤 감지
const titleRef = ref();
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const titleInfo = {
      intersecting: false,
      postTitle: res.title,
    };

    if (entries[0].intersectionRatio <= 0) titleInfo.intersecting = true;
    else titleInfo.intersecting = false;

    $emit('title-intersecting', titleInfo);
  });

  observer.observe(titleRef.value);
});
</script>

<template>
  <div class="post" id="content">
    <h2 ref="titleRef" class="title">{{ res.title }}</h2>
    <div class="flex">
      <span class="created">{{ `${created.date} ${created.time}` }}</span>
      <div class="btn-group">
        <button @click="$router.push(`/write?postId=${route.params.id}`)">
          수정
        </button>
        <button @click="deletePost">삭제</button>
      </div>
    </div>
    <div class="ck-content" v-html="res.content"></div>
  </div>
</template>
