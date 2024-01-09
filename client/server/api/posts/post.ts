export default defineEventHandler(async (e) => {
  const query = getQuery(e);
  const baseURL = process.env.API_PATH;

  const res = await $fetch(`${baseURL}/post`, {
    method: e.method,
    params: query,
  });

  return res;
});
