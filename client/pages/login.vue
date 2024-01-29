<script setup>
definePageMeta({
  layout: 'login',
});
</script>

<template>
  <div class="login-form">
    <h2>로그인</h2>
    <input type="text" placeholder="아이디" />
    <input type="password" placeholder="패스워드" />

    <input class="login-btn" type="button" value="로그인" />
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
    margin-top: 15px;
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
