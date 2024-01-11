export default async function useFetchApi(
  url: string,
  method: any,
  params: Object
) {
  const { data, error, status } = await useFetch(url, {
    method,
    params,
  });

  if (status.value === 'success') return data.value;
  else return error;
}
