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
const postRef = ref();
onMounted(() => {
  const observer = new IntersectionObserver(
    function (entries) {
      // intersectionRatio가 0이라는 것은 대상을 볼 수 없다는 것이므로
      // 아무것도 하지 않음
      if (entries[0].intersectionRatio <= 0) return;

      // 주시 시작
      if (entries[0].isIntersecting) $emit('post-intersecting', true);
      else $emit('post-intersecting', false);
    },
    { threshold: 0.1, rootMargin: '115px 0px 0px 0px' }
  );

  observer.observe(postRef.value);
});
</script>

<template>
  <div ref="postRef" class="post" id="content">
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
