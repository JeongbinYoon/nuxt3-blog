<script setup>
// const { res } = await useFetchApi('/api/categories', 'get');

const click = async () => {
  const { res } = await useFetchApi('/api/categories', 'get');
};
</script>
<template>
  <div id="category">
    {{ res }}
    <button @click="click">sd</button>
    <ul>
      <li>s</li>
    </ul>
  </div>
</template>
