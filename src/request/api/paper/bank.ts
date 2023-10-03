import { sessionGetData } from '../../../hooks/useStorage'
import service from '../../index'

// 获取个人的题目池
export function getMyBank() {
  return service({
    method: 'get',
    url: `/index/searchBankById?userId=${sessionGetData('userid')}`
  })
}

// 新增题库
export function addBank(bankname:string) {
  return service({
    method: 'post',
    url: `/index/addBank`,
    data: {
      userid: sessionGetData('userid'),
      bankname
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
