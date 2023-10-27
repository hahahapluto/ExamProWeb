import service from "../..";

// 获取所有监考人信息
export function getAllProctors() {
  return service({
    method: "get", // 使用GET请求
    url: "/invigilate/allProctors",
  });
}

// 添加考试监考人
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
export function getProctoringRecords(examID: number) {
  return service({
    method: "post",
    url: "/invigilate/proctoringRecordsByExamID",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      examID,
    },
  });
}

//根据考试ID查找监考记录
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

// 根据监考人ID查找要监考的考试信息
//根据考试ID查找监考记录
export function getExamsByProctorID() {
  return service({
    method: "post",
    url: "/invigilate/examsByProctorID",
  });
}
