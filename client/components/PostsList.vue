<script setup lang="ts">
defineProps({
  posts: Object,
});

const getCreatedAt = (created: '') => {
  return created.split('T')[0];
};
</script>
<template>
  <ul id="post-list">
    <li v-for="post in posts" class="post">
      <div class="flex-colum">
        <span class="category-path">
          {{ `${post.groupName} / ${post.categoryName}` }}
        </span>
        <NuxtLink :to="`/post/${post.postId}`">
          <p class="title">{{ post.title }}</p>
        </NuxtLink>
        <div class="preview" v-html="post.preview"></div>
        <div class="post-meta">
          <span class="created">{{ getCreatedAt(post.created) }}</span>
        </div>
      </div>
      <div>이미지</div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '~/assets/css/reset.scss';
@import '~/assets/css/variables.scss';

#post-list {
  max-width: 1100px;
  margin: 0 auto;
}
.post {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
}
.post + .post {
  border-top: 1px solid #eee;
}
.category-path {
  margin-bottom: 10px;
  font-size: 14px;
  color: $color-blurrier;
}
.title {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
}
.preview {
  font-size: 16px;
  margin-bottom: 20px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-meta {
  span {
    color: $color-blurrier;
  }
  span + span {
    margin-left: 15px;
  }
}
</style>
