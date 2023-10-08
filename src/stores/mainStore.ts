import { defineStore } from "pinia";
// import { ref } from 'vue'
// import { getMyQuestion } from '../request/api/paper/question'

// 主要数据 mainStore是一个标识 采用类似vue3的语法格式构建
// export const mainStore = defineStore('mainStore', () => {
//   //数据（state）
//   const myQuestionList: any = ref([])
//   const getmyQuestionList = async () => {
//     const res = await getMyQuestion()
//     myQuestionList.value = res.data.data
//   }
//   // 修改数据(action 同步＋异步)
//   // 以对象的方式return 供组件使用
//   return { myQuestionList, getmyQuestionList }
// })
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
