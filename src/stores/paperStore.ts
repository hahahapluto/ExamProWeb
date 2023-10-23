import { defineStore } from "pinia";
const paperStore = defineStore("paperStore", {
  // 公用数据
  state: () => {
    return {
      paperName: "",
      paperId: -1,
    };
  },
  // 公用方法
  actions: {},
  persist: true,
});
export default paperStore;
