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
  <div class="post content-padding" id="content">
    <!-- 글 제목 -->
    <h2 ref="titleRef" class="title">{{ res.title }}</h2>

    <!-- meta info -->
    <div class="meta-info">
      <span class="created">{{ `${created.date} ${created.time}` }}</span>
      <div class="meta-info-btns">
        <button @click="$router.push(`/write?postId=${route.params.id}`)">
          <font-awesome-icon icon="pen" />
        </button>
        <button @click="deletePost">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>

    <!-- 글 내용 -->
    <div class="ck-content" v-html="res.contents"></div>
  </div>
</template>
