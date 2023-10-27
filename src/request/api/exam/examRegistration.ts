import service from '../..'

// 获取所有考试数据
export function getAllExams() {
  return service({
    method: 'get', // 使用GET请求
    url: '/exam/allExams', // 考试数据的URL
    headers: { 'Content-Type': 'application/json' }
  })
}

// 考试报名
export function registerExam(examID: Number) {
  return service({
    method: 'post', // 使用GET请求
    url: '/exam/regExam', // 考试数据的URL
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      examID
    }
  })
}

// 通过用户id查询所拥有的考试
export function getMyExams() {
  return service({
    method: 'get',
    url: 'exam/userExams'
  })
}


// findExamineeExams 查询用户报名的考试
export function getExamineeExams() {
  return service({
    method: 'get',
    url: 'exam/findExamineeExams'
  })
}

// 查询报名考试的学生列表
export function getExamRegistUsers(examId: Number) {
  return service({
    method: 'get', // 使用GET请求
    url: '/exam/examRegistUsers?examId=' + examId, // 考试数据的URL
    headers: { 'Content-Type': 'application/json' }
  })
}
