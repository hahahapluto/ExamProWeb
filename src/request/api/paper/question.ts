import { sessionGetData } from '../../../hooks/useStorage'
import service from '../../index'

// 获取个人的题目池
export function getMyQuestion() {
  return service({
    method: 'post',
    url: '/index/searchQuesByUserId',
    data: {
      userid: sessionGetData('userid')
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 添加题目
export function addQuestion(questiontype: String, questiondescription: String, questionanswer: String) {
  return service({
    method: 'post',
    url: '/index/addQuestion',
    data: {
      questiontype,
      questiondescription,
      userid: sessionGetData('userid'),
      questionanswer
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
