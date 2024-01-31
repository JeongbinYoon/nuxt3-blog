export default async function useFetchApi(
  url: string,
  method: any,
  params?: Object,
  body?: Object
) {
  const auth = useCookie('authToken');

  const { data, error, status } = await useFetch(url, {
    method,
    params,
    body,
    headers: {
      authentication: auth.value || '',
    },
  });

  if (status.value === 'success') return data.value;
  else return error;
}
