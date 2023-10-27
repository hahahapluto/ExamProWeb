import service from '../../index'
// 获取我创建的考试
export function getMyExam() {
  return service({
    method: 'get',
    url: '/exam/userExams'
  })
}


// userExamsPassAll 查询通过的全部考试
export function userExamsPassAll() {
  return service({
    method: 'get',
    url: '/exam/userExamsPassAll'
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

// 查询通过初审的考试 examsPassJunior
export function getExamPassJunior() {
  return service({
    method: 'get',
    url: '/exam/examsPassJunior'
  })
}