import {create} from "zustand";

const useUserStore = create(
  (set) => ({
    user: null,
    setUser: (userInfo) => set(() => ({ user: userInfo })),
    clearUser: () => set(() => ({ user: null })),
  }),
  {
    name: "user-store",
  }
);

export default useUserStore;
