export default defineEventHandler(async () => {
  const baseURL = 'http://localhost:8080';
  const res = await $fetch(`${baseURL}/post`);
  console.log('res', res);

  return { message: 'hello' };
});
