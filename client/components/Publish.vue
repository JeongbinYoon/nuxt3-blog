<script setup>
const isPublic = ref(true);
</script>

<template>
  <div id="publish">
    <div class="content">
      <div>
        <p>공개설정</p>
        <div class="btn-group">
          <button
            :class="{ 'btn-primary': isPublic }"
            class="btn btn-white"
            @click="isPublic = true"
          >
            <font-awesome-icon icon="lock" />
            공개
          </button>
          <button
            :class="{ 'btn-primary': !isPublic }"
            class="btn btn-white"
            @click="isPublic = false"
          >
            <font-awesome-icon icon="earth-asia" />
            비공개
          </button>
        </div>
      </div>

      <div>
        <p>미리보기</p>
        <div class="thumbnail t-gray-light">
          <font-awesome-icon icon="plus" />
        </div>
      </div>

      <div>
        <p class="title">asd</p>
        <textarea class="short-content"></textarea>
      </div>

      <div>
        <button class="btn">취소</button>
        <button class="btn btn-primary">게시하기</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#publish {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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

    .short-content {
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
