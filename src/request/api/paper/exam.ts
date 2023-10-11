import service from '../../index'
// 获取我创建的考试
export function getMyExam() {
  return service({
    method: 'get',
    url: '/exam/userExams'
  })
}

// 创建考试
export function addExam(examName: string, examDescription: string, paperID: string, startTime: string, examDuration: Number) {
  return service({
    method: 'post',
    url: '/exam/addExam',
    data: {
      examName,
      examDescription,
      paperID,
      startTime,
      examDuration
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
