<script lang="ts" setup>
definePageMeta({
  layout: 'login',
});

const router = useRouter();

const id = ref('');
const pw = ref('');
const name = ref('');

const onLogin = async () => {
  const { res, status } = await useFetchApi(
    '/api/login',
    'post',
    {},
    { id: id.value, pw: pw.value, name: name.value }
  );
  if (status === 'ok') {
    router.push('/');
  } else alert(res.msg);
};
const onJoin = async () => {
  const { res } = await useFetchApi(
    '/api/join',
    'post',
    {},
    { id: id.value, pw: pw.value, name: name.value }
  );

  alert(res.msg);
};
</script>

<template>
  <div class="login-form">
    <h2>로그인</h2>
    <input v-model="id" type="text" placeholder="아이디" />
    <input v-model="pw" type="password" placeholder="패스워드" />
    <input v-model="name" type="name" placeholder="별명" />

    <input @click="onLogin" class="login-btn" type="button" value="로그인" />
    <input @click="onJoin" class="join-btn" type="button" value="회원가입" />
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.login-form {
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: 100px auto 0 auto;
  input {
    height: 45px;
    padding: 0 10px;
    border-radius: 4px;
  }

  .login-btn {
    margin-top: 10px;
  }

  .login-btn,
  .join-btn {
    background: $button-color-background;
    color: $button-color;
    border: none;
    cursor: pointer;
    &:hover {
      background: $button-color-hover-background;
    }
  }
  input + input {
    margin-top: 5px;
  }
  h2 {
    text-align: center;
  }
}
</style>
