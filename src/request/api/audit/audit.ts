import service from '../..'
export function setQuesJuniorPass(questionId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/quesJuniorPass?questionId=' + questionId // 考试数据的URL
  })
}
export function setQuesJuniorRefuse(questionId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/quesJuniorRefuse?questionId=' + questionId // 考试数据的URL
  })
}
export function setExamJuniorPass(examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/examJuniorPass?examId=' + examId // 考试数据的URL
  })
}
export function setExamJuniorRefuse(examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/examJuniorRefuse?examId=' + examId // 考试数据的URL
  })
}
export function setPaperJuniorPass(paperId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/paperJuniorPass?paperId=' + paperId // 考试数据的URL
  })
}
export function setPaperJuniorRefuse(paperId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/paperJuniorRefuse?paperId=' + paperId // 考试数据的URL
  })
}

// 通过题目题库终极审核
export function setQuesUltimatePass(bankId: Number, questionId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/quesUltimatePass?bankId=' + bankId + '&questionId=' + questionId // 考试数据的URL
  })
}
export function setQuesUltimateRefuse(bankId: Number, questionId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/quesUltimateRefuse?bankId=' + bankId + '&questionId=' + questionId // 考试数据的URL
  })
}
export function setExamUltimatePass(examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/examUltimatePass?examId=' + examId // 考试数据的URL
  })
}
export function setExamUltimateRefuse(examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/examUltimateRefuse?examId=' + examId // 考试数据的URL
  })
}
export function setPaperUltimatePass(paperId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/paperUltimatePass?paperId=' + paperId // 考试数据的URL
  })
}
export function setPaperUltimateRefuse(paperId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/audit/paperUltimateRefuse?paperId=' + paperId // 考试数据的URL
  })
}
