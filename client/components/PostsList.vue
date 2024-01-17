<script setup>
defineProps({
  posts: Object,
});

const getCreatedAt = (created) => {
  const date = created.split('T')[0];
  const time = created.split('T')[1].split('.')[0];
  return `${date} ${time}`;
};
</script>
<template>
  <ul>
    <li v-for="post in posts" class="post">
      <NuxtLink :to="`/post/${post.post_id}`" class="title">{{
        post.title
      }}</NuxtLink>
      <div class="short-content" v-html="post.short_content"></div>
      <div class="post-info">
        <span class="created">{{ getCreatedAt(post.created) }}</span>
        <span class="comment">0개의 댓글</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.post {
  padding: 40px 0;
}
.post + .post {
  border-top: 1px solid #eee;
}
.title {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
}
.short-content {
  font-size: 16px;
  margin-bottom: 20px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-info {
  color: #666;
  > span {
    margin-right: 15px;
  }
}
</style>
