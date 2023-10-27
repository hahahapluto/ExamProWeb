import service from "../..";

// 获取所有考试数据
export function getAllProctors() {
  return service({
    method: "get", // 使用GET请求
    url: "/invigilate/allProctors",
  });
}

// 获取所有考试数据
export function addExamProctors(proctorID: number, examID: number) {
  return service({
    method: "post",
    url: "/invigilate/addExamProctors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      proctorID,
      examID,
    },
  });
}

// 插入监考记录
export function addProctoringRecord(
  examineeID: number,
  examID: number,
  proctorID: number,
  issueContent: string,
  senderID: number
) {
  return service({
    method: "post",
    url: "/invigilate/addProctoringRecord",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      examineeID,
      examID,
      proctorID,
      issueContent,
      senderID,
    },
  });
}

// 根据考试ID查找监考人
export function findProctorsByExamID(examID: number) {
  return service({
    method: "post",
    url: "/invigilate/findProctorsByExamID",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      examID,
    },
  });
}
