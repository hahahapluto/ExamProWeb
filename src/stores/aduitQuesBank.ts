import { defineStore } from 'pinia'
const aduitQuesBank = defineStore('aduitQuesBank', {
  // 公用数据
  state: () => {
    return {
      auditBankId: 0,
      auditBankName: ''
    }
  },
  // 公用方法
  actions: {},
  persist: true
})
export default aduitQuesBank
