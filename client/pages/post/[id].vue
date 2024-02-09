<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const { $emit } = useNuxtApp();

const emit = defineEmits(['post-intersecting']);

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);

const postId = ref(route.params.id);

// 글 정보 불러오기
const { res: postData } = await useFetchApi('/api/post', 'get', {
  id: postId,
});

// 날짜
const created = ref({});
created.value.date = postData.created.split('T')[0];
created.value.time = postData.created.split('T')[1].split('.')[0];

//  글 삭제
const deletePost = async () => {
  const answer = confirm('삭제하시겠습니까?');
  if (answer) {
    const { status } = await useFetchApi('/api/post', 'delete', {
      id: postId,
    });
    if (status === 'ok') {
      router.push('/');
    }
  }
};

// 공감
const isLiked = ref(false);
const likesCount = ref(postData.likes);
const toggleLike = async () => {
  isLiked.value = !isLiked.value;

  const { res, status } = await useFetchApi('/api/likes', 'put', {
    isLiked: isLiked.value,
    id: postId,
  });

  if (status === 'ok') {
    likesCount.value = res.likes;
  }
};

// 글 스크롤 감지
const titleRef = ref();
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const titleInfo = {
      intersecting: false,
      postTitle: postData.title,
    };

    if (entries[0].intersectionRatio <= 0) titleInfo.intersecting = true;
    else titleInfo.intersecting = false;

    $emit('title-intersecting', titleInfo);
  });

  observer.observe(titleRef.value);

  onBeforeUnmount(() => {
    const titleInfo = {
      intersecting: false,
      postTitle: '',
    };
    $emit('title-intersecting', titleInfo);
    observer.disconnect();
  });
});

// 공유하기
const isShareClicked = ref(false);

// 링크 공유
const shareLink = () => {};
</script>

<template>
  <div class="post content-padding" id="content">
    <!-- 글 제목 -->
    <h2 ref="titleRef" class="title">{{ postData.title }}</h2>

    <!-- meta info -->
    <div class="meta-info">
      <span class="created">{{ `${created.date} ${created.time}` }}</span>
      <ClientOnly>
        <div v-if="isLogin" class="meta-info-btns">
          <button @click="$router.push(`/write?postId=${route.params.id}`)">
            <font-awesome-icon icon="pen" />
          </button>
          <button @click="deletePost">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </ClientOnly>
    </div>

    <!-- 글 내용 -->
    <div class="ck-content" v-html="postData.contents"></div>

    <!-- 공감, 공유 -->
    <ClientOnly>
      <div class="icons">
        <div>
          <button
            class="likes"
            :class="{ selected: isLiked }"
            @click.stop="toggleLike"
          >
            <font-awesome-icon icon="heart" />
            <span class="likes-count">{{ likesCount }}</span>
          </button>
        </div>

        <div class="share">
          <button
            @click="isShareClicked = !isShareClicked"
            :class="{ active: isShareClicked }"
          >
            <font-awesome-icon icon="share-nodes" />
          </button>

          <div v-if="isShareClicked" class="share-items">
            <button @click="shareLink">
              <font-awesome-icon icon="paperclip" />
            </button>
            <button @click="shareLink">
              <font-awesome-icon icon="paperclip" />
            </button>
            <button @click="shareLink">
              <font-awesome-icon icon="paperclip" />
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
