<script lang="ts" setup>
definePageMeta({
  layout: 'manage',
});

const categories = ref([]);
const newGroupName = ref('');
const newCategoryName = ref('');
const addGroupInput = ref(false);
const addCategoryGroupId = ref('');

const getCategories = async () => {
  const { res } = await useFetchApi('/api/categories', 'get');
  categories.value = res;
};

// 카테고리 목록 조회
await getCategories();

// 추가 인풋 삭제
const deleteAddInput = (type: string) => {
  if (type === 'group') {
    newGroupName.value = '';
    addGroupInput.value = false;
  } else if (type === 'category') {
    newCategoryName.value = '';
    addCategoryGroupId.value = '';
  }
};

// 그룹, 카테고리 추가
const addGroup = async (type: string) => {
  const params = {
    type,
    name: type === 'group' ? newGroupName.value : newCategoryName.value,
  };

  if (type === 'category') {
    params.parentId = addCategoryGroupId.value;
  }

  const { msg, status } = await useFetchApi(
    '/api/category',
    'post',
    {},
    params
  );

  if (status === 'ok') {
    deleteAddInput(type);
    getCategories();
  } else {
    alert(msg);
  }
};

// 그룹, 카테고리 삭제
const deleteCategory = async (item) => {
  if (!item) return;

  const answer = confirm(`${item.name}를 정말 삭제하시겠습니까?`);
  if (!answer) return;

  const { msg, status } = await useFetchApi(
    '/api/category',
    'delete',
    {},
    item
  );
  if (status === 'ok') {
    alert('삭제되었습니다.');
    getCategories();
  } else {
    alert(msg);
  }
};
</script>

<template>
  <h2>카테고리 관리</h2>

  <div>
    <div class="category">
      <ul>
        <li class="group" v-for="group in categories">
          <div>
            <p>{{ group.name }}</p>
            <div class="btns">
              <button @click="addCategoryGroupId = group.id">추가</button>
              <button>수정</button>
              <button
                @click="deleteCategory(group)"
                :disabled="group.list.length"
              >
                삭제
              </button>
            </div>
          </div>
          <ul>
            <li class="group-item" v-for="item in group.list">
              <div>
                <p>
                  {{ item.name }}
                  <span class="post-count">({{ item.postCount }})</span>
                </p>
              </div>
              <div class="btns">
                <button>수정</button>
                <button
                  @click="deleteCategory(item)"
                  :disabled="item.postCount > 0"
                >
                  삭제
                </button>
              </div>
            </li>

            <!-- 카테고리 추가 영역 -->
            <li
              v-if="addCategoryGroupId === group.id"
              class="group-item add-input"
            >
              <div>
                <input
                  type="text"
                  v-model="newCategoryName"
                  placeholder="카테고리 이름 입력"
                />
              </div>
              <div class="btns">
                <button @click="deleteAddInput('category')">취소</button>
                <button
                  @click="addGroup('category')"
                  :disabled="!newCategoryName"
                >
                  확인
                </button>
              </div>
            </li>
          </ul>
        </li>

        <!-- 그룹 추가 영역 -->
        <li v-if="addGroupInput" class="group add-input">
          <div>
            <input
              type="text"
              v-model="newGroupName"
              placeholder="그룹 이름 입력"
            />
            <div class="btns">
              <button @click="deleteAddInput('group')">취소</button>
              <button @click="addGroup('group')" :disabled="!newGroupName">
                확인
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="add-group" @click="addGroupInput = true">
        <p>+ 그룹 추가</p>
      </div>
    </div>
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
      font-size: 16px;
      height: 45px;
      background-color: #fff;
      border: 1px solid #ccc;
      .btns {
        display: none;
        button {
          padding: 5px 15px;
          background-color: #fff;
          color: #333;
          border: 1px solid #ccc;
          cursor: pointer;
          &:disabled {
            color: #ccc;
          }
        }
        button + button {
          margin-left: 5px;
        }
      }
      &:hover {
        background-color: #f7f7f7;
        .btns {
          display: block;
        }
      }
    }

    > ul > li {
      margin-bottom: -1px;
    }
    .group-item {
      margin-left: 20px;
      font-size: 14px;
      .post-count {
        margin-left: 5px;
        color: #666;
        letter-spacing: 2px;
      }
    }
  }

  .add-input {
    > div {
      background-color: #f7f7f7;
    }

    input {
      width: 200px;
      height: 30px;
      padding-left: 10px;
      border: 1px solid #ccc;
      outline: none;
    }
    .btns {
      display: block !important;
    }
  }

  .add-group {
    display: flex;
    align-items: center;
    height: 45px;
    margin: 10px 0 0 0;
    padding: 0 20px;
    background: none;
    border: 1px solid #777;
    border-style: dashed;
    font-weight: 300;
    cursor: pointer;
  }
}
</style>
