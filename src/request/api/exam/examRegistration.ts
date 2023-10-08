import service from "../..";

// 获取所有考试数据
export function getAllExams() {
  return service({
    method: "get", // 使用GET请求
    url: "/exam/allExams", // 考试数据的URL
    headers: { "Content-Type": "application/json" },
  });
}
