import service from '../..'
// 新增考试数据
export function addExamRecord(paperId: Number, questionId: Number, studentAnswer: String, totalScore: Number, examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/exam/addExamRecord?paperId=' + paperId + '&questionId=' + questionId + '&studentAnswer=' + studentAnswer + '&score=0&totalScore=' + totalScore + '&examId=' + examId, //
    headers: { 'Content-Type': 'application/json' }
  })
}

// isUserDoneExam 判断是否有考试记录
export function isUserDoneExam(examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/exam/isUserDoneExam?examId=' + examId,
    headers: { 'Content-Type': 'application/json' }
  })
}

// 根据用户id获取考试记录 getAllExamRecord
export function getAllExamRecord(examId: Number) {
  return service({
    method: 'post', // 使用GET请求
    url: '/exam/getAllExamRecord?examId=' + examId,
    headers: { 'Content-Type': 'application/json' }
  })
}

//getAllExamRecordMana
export function getAllExamRecordMana(examId: Number,userId:Number) {
  return service({
    method: 'post', // 使用GET请求
    url: '/exam/getAllExamRecordMana?examId=' + examId+'&userId='+userId,
    headers: { 'Content-Type': 'application/json' }
  })
}


// 更新学生成绩 updateUserExamScore
export function updateUserExamScore(userId:Number,examId: Number, questionId: Number, score: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/exam/updateUserExamScore?userId='+userId+'&examId=' + examId + '&questionId=' + questionId + '&score=' + score,
    headers: { 'Content-Type': 'application/json' }
  })
}
