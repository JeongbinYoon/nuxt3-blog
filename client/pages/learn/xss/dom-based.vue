<script setup>
definePageMeta({
  layout: 'empty',
});

const title = ref('');
const contents = ref('');

const submit = () => {
  console.log('title', title.value);
  console.log('contents', contents.value);
};
</script>

<template>
  <div id="stored-xss">
    <h1>Dom-based XSS</h1>
    <XssNav />

    <div>
      <ul>
        <li>asdas</li>
        <li>asdas</li>
      </ul>
      <div>
        <label for="title">제목</label>
        <input v-bind="title" type="text" id="title" />

        <label for="contents">내용</label>
        <textarea
          v-bind="contents"
          id="contents"
          cols="30"
          rows="10"
        ></textarea>

        <button @click="submit">저장</button>
      </div>
    </div>
  </div>
</template>
