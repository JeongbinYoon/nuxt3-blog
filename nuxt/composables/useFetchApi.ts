export default async function useFetchApi(
  url: string,
  method: any,
  params?: Object,
  body?: Object
) {
  const auth = useCookie('authentication');

  const { data, error, status } = await useFetch(url, {
    method,
    params,
    body,
    headers: {
      authentication: auth.value || '',
    },
  });

  if (process.client) {
    const loginYn = useCookie('isLogin');

    // 스토어 생성
    const authStore = useAuthStore();
    // 반응형 객체로 변환
    authStore.setIsLogin(loginYn.value === 'Y' ? true : false);
  }

  if (status.value === 'success') return data.value;
  else return error;
}
