export default async function useFetchApi(
  url: string,
  method: any,
  params: Object
) {
  return await useFetch(url, {
    method,
    params,
  });
}
