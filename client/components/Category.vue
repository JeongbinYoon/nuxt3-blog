<script setup>
const { res } = await useFetchApi('/api/categories', 'get');
</script>
<template>
  <div id="category">
    <ul>
      <li v-for="parent in res">
        <p class="parent">{{ parent.name }}</p>
        <ul>
          <li v-for="child in parent.list">
            <NuxtLink to="/" class="child">{{ child.name }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
