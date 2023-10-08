import { defineStore } from 'pinia'
const quesStore = defineStore('quesStore', {
  // 公用数据
  state: () => {
    return {
      bankId: 0,
      bankName: ''
    }
  },
  // 公用方法
  actions: {}
})
export default quesStore
