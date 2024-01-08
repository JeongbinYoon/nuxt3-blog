export default defineEventHandler(async () => {
  const baseURL = process.env.API_PATH;
  const res = await $fetch(`${baseURL}/`);

  return res;
});
