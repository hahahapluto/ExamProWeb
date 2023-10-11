import service from '../../index'
// 获取全部试卷
export function getPaper() {
  return service({
    method: 'get',
    url: '/paper/searchPaper'
  })
}
