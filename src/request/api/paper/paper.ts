import service from "../../index";
// 获取全部试卷
export function getPaper() {
  return service({
    method: "get",
    url: "/paper/searchPaper",
  });
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
