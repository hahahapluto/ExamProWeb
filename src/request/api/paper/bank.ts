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

// 获取题库里面的题目 selectBankQuesByBankId
export function getQuesInBank(bankid:Number) {
  return service({
    method: 'post',
    url: `/index/selectBankQuesByBankId`,
    data: {
      bankid
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 添加题mu到题库
export function addQuesInBank(bankid: Number, questionid: Number) {
  return service({
    method: 'POST',
    url: '/index/addQuesInBank',
    data: {
      bankid,
      questionid
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 修改题库名称
export function editBank(bankname: string) {
  return service({
    method: 'POST',
    url: '/index/updateBank',
    data: {
      bankname
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}