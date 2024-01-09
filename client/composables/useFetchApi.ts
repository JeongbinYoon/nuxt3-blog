export default async function useFetchApi(
  url: string,
  method: string,
  params: Object
) {
  return await useFetch(url, {
    method,
    params,
  });
}
