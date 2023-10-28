import { defineStore } from "pinia";
const paperStore = defineStore("paperStore", {
  // 公用数据
  state: () => {
    return {
      examName: "",
      paperName: "",
      paperId: -1,
      scoreExamId: -1,
      scoreUserId: -1,
      showFlag: false,
    };
  },
  // 公用方法
  actions: {},
  persist: true,
});
export default paperStore;
