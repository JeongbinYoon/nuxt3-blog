<template>
  <div>
    <ckeditor
      :editor="DecoupledEditor"
      :config="editorConfig"
      v-model="editorHtml"
      @ready="onReady"
    />
  </div>
</template>

<script setup>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import { UploadAdapter } from './UploadAdapter';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}

const editorConfig = ref({
  language: 'ko',
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'fontfamily',
      'fontsize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'strikethrough',
      // '-', // break point
      '|',
      'alignment',
      'link',
      //   'insertImage',
      'uploadImage',
      'mediaEmbed',
      'insertTable',
      'blockQuote',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
    ],
    shouldNotGroupWhenFull: true,
  },
  extraPlugins: [uploadPlugin],
});

const editorHtml = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const onReady = (editor) => {
  // Insert the toolbar before the editable area.
  editor.ui
    .getEditableElement()
    .parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
};
</script>
