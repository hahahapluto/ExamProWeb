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

// 分页获取通过的题目
export const getQuesPass = (page: number, pageSize: number) => {
  return service({
    method: "post",
    url: "/index/selectQuesPass",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      page,
      pageSize,
    },
  });
};

// selectQuesPassAll
export const getQuesPassAll = () => {
  return service({
    method: 'get',
    url: '/index/selectQuesPassAll',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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

// 获取题目池的页数
export function getQuestionPoolPageCount(pageSize: number) {
  return service({
    method: "post",
    url: "/index/getQuestionPoolPageCount",
    data: {
      pageSize,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}
