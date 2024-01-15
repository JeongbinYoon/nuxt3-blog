<template>
  <div>
    <ckeditor
      :editor="ClassicEditor"
      :config="editorConfig"
      v-model="editorHtml"
    />
    <div>
      Content is:
      <div v-html="editorHtml"></div>
    </div>
  </div>
</template>
<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const editorConfig = ref({
  language: 'ko',
});

const editorHtml = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
