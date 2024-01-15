<template>
  <div>
    <ClientOnly>
      <Editor v-model="content" />
    </ClientOnly>
    <div>content is:{{ content }}</div>
  </div>
</template>
<script setup>
import Editor from '~/components/editor';
const content = ref();
</script>
