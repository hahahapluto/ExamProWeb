import { sessionGetData } from '../../../hooks/useStorage'
import service from '../../index'

// 获取个人的题目池
export function getAllQuestion() {
  return service({
    method: 'post',
    url: '/index/searchQuesByUserId',
    data: {
      userid: sessionGetData('userid')
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
