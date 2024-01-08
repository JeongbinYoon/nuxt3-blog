export default defineEventHandler(async (context) => {
  const baseURL = process.env.API_PATH;
  const res = await $fetch(`${baseURL}/post`);

  return res;
});
