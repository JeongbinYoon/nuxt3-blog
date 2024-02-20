<script lang="ts" setup>
const props = defineProps({
  popVisible: {
    type: Object,
    default: () => {},
  },
  postInfo: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

const isPublic = ref(true);
const preview = ref(props.postInfo.preview || '');

// 게시하기
const onPublish = async () => {
  let httpMethod = props.postInfo.isUpdate ? 'put' : 'post';
  const query = { id: props.postInfo.isUpdate ? props.postInfo.postId : null };
  const params = {
    title: props.postInfo.title,
    contents: props.postInfo.contents,
    preview,
    author: '2',
    category: props.postInfo.category,
  };

  const { res, status } = await useFetchApi(
    'api/post',
    httpMethod,
    query,
    params
  );

  let alertMsg = res.msg;
  alert(alertMsg);

  if (status === 'ok') {
    let id = props.postInfo.isUpdate ? props.postInfo.postId : res.postId;
    router.push(`/post/${id}`);
  }
};

// 썸네일 등록
const thumbnailInfo = ref({ src: '', name: '' });
const uploadThumbnail = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  if (file && formData) {
    thumbnailInfo.value.src = URL.createObjectURL(file);
    thumbnailInfo.value.name = file.name;

    await useFetchApi('/api/image/upload', 'post', {}, formData);
  }
};
</script>

<template>
  <div v-if="popVisible.visible" id="publish">
    <div class="content">
      <div>
        <p>공개설정</p>
        <div class="btn-group">
          <button
            :class="{ 'btn-border-primary': isPublic }"
            class="btn btn-white"
            @click="isPublic = true"
          >
            <font-awesome-icon icon="earth-asia" />
            공개
          </button>
          <button
            :class="{ 'btn-border-primary': !isPublic }"
            class="btn btn-white"
            @click="isPublic = false"
          >
            <font-awesome-icon icon="lock" />
            비공개
          </button>
        </div>
      </div>

      <div>
        <p>미리보기</p>
        <label for="thumbnail">
          <div class="thumbnail t-gray-light">
            <template v-if="!thumbnailInfo.src">
              <font-awesome-icon icon="plus" />
            </template>
            <template v-else>
              <img :src="thumbnailInfo.src" :alt="thumbnailInfo.name" />
            </template>
          </div>
        </label>
        <input
          v-show="false"
          type="file"
          id="thumbnail"
          @change="uploadThumbnail"
        />
      </div>

      <div>
        <p class="title">{{ postInfo.title }}</p>
        <textarea
          v-model="preview"
          class="preview"
          placeholder="짧은 소개를 작성해보세요."
        ></textarea>
      </div>

      <div>
        <button class="btn" @click="popVisible.visible = false">취소</button>
        <button class="btn btn-primary" @click="onPublish">
          {{ postInfo.isUpdate ? '수정하기' : '게시하기' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#publish {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px;
  padding: 50px 0;
  background-color: #f7f8f9;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0px 3px 10px #cdcdcd;
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;

    p {
      margin: 0 0 10px 0;
    }

    em {
      display: inline-block;
      margin-bottom: 10px;
    }
    .btn-group {
      margin: 0;
      button {
        width: 145px;
      }
    }

    .thumbnail {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 150px;
      font-size: 24px;
      background-color: #fff;
      box-shadow: 1px 3px 6px #f2f2f2;
      cursor: pointer;
      &:hover {
        background-color: #f6f6f6;
      }
    }

    .preview {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      height: 100px;
      padding: 10px;
      border: none;
      box-shadow: 1px 3px 6px #f2f2f2;
      &:focus {
        outline: none;
      }
    }

    > div:last-child {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
}
</style>
