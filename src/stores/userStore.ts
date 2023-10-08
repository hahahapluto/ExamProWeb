import { defineStore } from "pinia";
//用户数据
const userStore = defineStore("userStore", {
  state: () => {
    return {
      username: "",
      role: 0,
      token: "", // token
    };
  },
  persist: true,
});
export default userStore;
