import { sessionGetData } from '../../../hooks/useStorage'
import service from '../../index'

// 获取个人的题目池
export function getMyBank() {
  return service({
    method: 'get',
    url: `/index/searchBankById?userId=${sessionGetData('userid')}`
  })
}
