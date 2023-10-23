import { sessionGetData } from "../../../hooks/useStorage";
import service from "../../index";

// 获取全部题目
export const getAllQues = () => {
  return service({
    method: "post",
    url: "/index/searchAllQues",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
// searchQuesPass
export const getQuesPass = () => {
  return service({
    method: 'get',
    url: '/index/searchQuesPass',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
// 获取个人的题目池
export function getMyQuestion() {
  return service({
    method: "post",
    url: "/index/searchQuesByUserId",
    data: {
      userid: sessionGetData("userid"),
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

// 添加题目
export function addQuestion(
  questiontype: String,
  questiondescription: String,
  questionanswer: String,
  questionscore: String
) {
  return service({
    method: "post",
    url: "/index/addQuestion",
    data: {
      questiontype,
      questiondescription,
      userid: sessionGetData("userid"),
      questionanswer,
      questionscore: questionscore,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}
