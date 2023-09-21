import service from '../../index'
// 获取个人的题目池
export function getAllQuestion(pagenum: Number, pagesize: Number) {
  return service({
    method: 'get',
    url: '/index/getQuestionById',
    data: {
      pagenum, // 当前页码
      pagesize // 每页显示条数
    }
  })
}
