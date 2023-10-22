import { defineStore } from "pinia";
const paperStore = defineStore("paperStore", {
  // 公用数据
  state: () => {
    return {
      paperName: "",
      quesSequenceDatas: [
        {
          name: "单选题",
          score: "0分",
          lists: [] as number[],
        },
        {
          name: "多选题",
          score: "0分",
          lists: [] as number[],
        },
        {
          name: "主观题",
          score: "0分",
          lists: [] as number[],
        },
      ],
    };
  },
  // 公用方法
  actions: {},
  persist: true,
});
export default paperStore;
