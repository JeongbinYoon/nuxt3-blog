<script lang="ts" setup>
definePageMeta({
  layout: 'manage',
});

const { res } = await useFetchApi('/api/categories', 'get');

const categoryGroup = ref({
  parentId: '',
  categoryId: '',
});
</script>

<template>
  <h2>카테고리 관리</h2>

  <!-- 대분류 -->
  <!-- <select v-model="categoryGroup.parentId">
    <option value="">대분류 선택</option>
    <option v-for="group in res" :value="group.id">
      {{ group.name }}
    </option>
  </select> -->

  <!-- 카테고리 -->
  <!-- <select v-if="categoryGroup.parentId">
    <option value="">카테고리 선택</option>
    <option
      v-for="category in res.find((el) => el.id == categoryGroup.parentId).list"
      value=""
    >
      {{ category.name }}
    </option>
  </select> -->
  <!-- 
  <div>
    <input type="text" />
    <button>추가</button>
  </div> -->

  <div>
    <ul class="category">
      <li class="group" v-for="parent in res">
        <div>
          <p>{{ parent.name }}</p>
          <div class="btns">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
        <ul>
          <li class="group-item" v-for="child in parent.list">
            <div>
              <p>{{ child.name }}</p>
            </div>
            <div class="btns">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import '~/assets/css/reset.scss';

.category {
  margin-top: 20px;
  padding: 20px;
  background-color: rgb(236, 240, 244);

  .group > div {
    margin-bottom: -1px;
  }
  .group {
    > div,
    .group-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font-size: 18px;
      height: 45px;
      background-color: #fff;
      border: 1px solid #ccc;
      .btns {
        display: none;
        button + button {
          margin-left: 5px;
        }
      }
      &:hover {
        .btns {
          display: block;
        }
      }
    }

    > ul > li {
      margin-bottom: -1px;
    }
    .group-item {
      font-size: 16px;
      margin-left: 20px;
    }
  }
}
</style>
