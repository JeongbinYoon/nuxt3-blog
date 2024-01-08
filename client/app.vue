<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup>
await $fetch('/api/post');
</script>
