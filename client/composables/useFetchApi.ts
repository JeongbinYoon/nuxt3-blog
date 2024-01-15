export default async function useFetchApi(
  url: string,
  method: any,
  params: Object,
  body: Object
) {
  const { data, error, status } = await useFetch(url, {
    method,
    params,
    body,
  });

  if (status.value === 'success') return data.value;
  else return error;
}
