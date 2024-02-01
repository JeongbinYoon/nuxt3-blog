import { defineStore } from 'pinia';
interface User {
  id: string;
  name: string;
}
// auth 스토어
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {
        id: '',
        name: '',
      } as User,
      isLogin: false,
    };
  },
  getters: {
    getId: (state): string => state.user.id,
    getIsLogin: (state): boolean => state.isLogin,
  },
  actions: {
    setUser(data: User) {
      this.user = data;
    },
    setIsLogin(data: boolean) {
      this.isLogin = data;
    },
  },
});

if (import.meta.hot) {
  //HMR
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
