import service from "../../index";
// 获取全部试卷
export function getPaper() {
  return service({
    method: "get",
    url: "/paper/searchPaper",
  });
}

//  searchPaperPassAll 查询通过初审和终审的卷子
export function getPaperPassAll() {
  return service({
    method: 'get',
    url: '/paper/searchPaperPassAll'
  })
}

// 添加试卷
export function addPaper(paperName: string) {
  return service({
    method: "post",
    url: "/paper/addPaper",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: { paperName, objectiveScore: 0, subjectiveScore: 0, totalScore: 0 },
  });
}

// 向试卷里面添加题目
export function addQuesIntoPaper(data: any) {
  return service({
    method: "post",
    url: "/paper/addQuesById",
    headers: { "Content-Type": "application/json" },
    data,
  });
}

// 根据试卷id获取所有题目
// /paper/findQuesByPaperId
export function findQuesByPaperId(paperId: Number) {
  return service({
    method: "post",
    url: "/paper/findQuesByPaperId",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: { paperId },
  });
}

// 查询通过初审的卷子 searchPaperPassJunior
export function getPaperPassJunior() {
  return service({
    method: 'get',
    url: '/paper/searchPaperPassJunior'
  })
}
