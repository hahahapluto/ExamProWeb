import { defineStore } from "pinia";
const mainStore = defineStore("mainStore", {
  // 公用数据
  state: () => {
    return {
      count: 0,
    };
  },
  // 公用方法
  actions: {
    increacement() {
      this.count++;
    },
  },
  persist: true,
});
export default mainStore;
