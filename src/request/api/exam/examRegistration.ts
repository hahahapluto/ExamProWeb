import service from "../..";

// 获取所有考试数据
export function getAllExams() {
  return service({
    method: "get", // 使用GET请求
    url: "/exam/allExams", // 考试数据的URL
    headers: { "Content-Type": "application/json" },
  });
}

// 考试报名
export function registerExam(examID: Number) {
  return service({
    method: "post", // 使用GET请求
    url: "/exam/regExam", // 考试数据的URL
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      examID,
    },
  });
}
