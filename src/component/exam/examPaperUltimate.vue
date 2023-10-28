<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { sessionGetData } from "../../hooks/useStorage";
import {
  addProctoringRecord,
  findProctorsByExamID,
  getProctoringRecords,
} from "../../request/api/invigilate/invigilate";
import { findQuesByPaperId } from "../../request/api/paper/paper";
import {
  addExamRecord,
  isUserDoneExam,
} from "../../request/api/record/userExamRecord";
import "../../sass/invigilate/InvigilationChat.scss";
import "../../sass/paper/createPaper.scss";
import pinia from "../../stores";
import paperStore from "../../stores/paperStore";
import { ProctoringRecord } from "../../types/invigilate";
import { quesScoreMarkType } from "../../types/paper";
import multipleChoice from "../paper/paperComponent/multipleChoice.vue";
import quesSequence from "../paper/paperComponent/quesSequence.vue";
import subQuestions from "../paper/paperComponent/subQuestions.vue";

interface quesData {
  questionId: number;
  questionType: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: string;
}

// 试卷的数据
const paperData = paperStore(pinia);
// 左侧-题目序列数据
const quesSequenceDatas = ref<quesScoreMarkType[]>([
  {
    name: "单选题",
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
    quesScore: [] as number[],
  },
  {
    name: "多选题",
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
    quesScore: [] as number[],
  },
  {
    name: "主观题",
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
    quesScore: [] as number[],
  },
]);

// 将选项转换成数组
function extractQuestionAndOptions(text: string) {
  let all = text.split("(exampro)");
  let question = all[0];
  let options = extractValues(all[1]);
  return [question, ...options];
}

function extractValues(text: string) {
  const values = text.split("&").map((item) => {
    const parts = item.split("=");
    if (parts.length === 2) {
      return parts[1];
    }
    return null;
  });

  return values.filter((value) => value !== null);
}

// 单选题内容
let danXuan = ref<string[][]>([]);
// 多选题内容
let duoXuan = ref<string[][]>([]);
// 主观题内容
let subText = ref<string[]>([]);
// 试卷的题目数据
let quesDatas: quesData[] = [];

// let showFlag = ref<Boolean>()

// 初始化数据
const InitializedData = () => {
  quesSequenceDatas.value = [
    {
      name: "单选题",
      score: 0,
      lists: [] as number[],
      actives: [] as boolean[],
      answer: [] as string[],
      quesScore: [] as number[],
    },
    {
      name: "多选题",
      score: 0,
      lists: [] as number[],
      actives: [] as boolean[],
      answer: [] as string[],
      quesScore: [] as number[],
    },
    {
      name: "主观题",
      score: 0,
      lists: [] as number[],
      actives: [] as boolean[],
      answer: [] as string[],
      quesScore: [] as number[],
    },
  ];
  danXuan.value = [];
  duoXuan.value = [];
  subText.value = [];
};

// 获取试卷的题目数据
const getQuesDataByPaperId = async (paperId: Number) => {
  InitializedData();
  console.log("获取试卷题目");
  let res = await findQuesByPaperId(paperId);
  quesDatas = res.data.data;
  console.log(quesDatas);
  quesDatas.map((item: quesData) => {
    if (item.questionType === "0") {
      // type = "主观题";
      quesSequenceDatas.value[2].lists.push(item.questionId);
      quesSequenceDatas.value[2].quesScore.push(
        Number.parseInt(item.questionScore)
      );
      quesSequenceDatas.value[2].score += Number.parseInt(item.questionScore);
      subText.value.push(item.questionDescription);
    } else if (item.questionType === "1") {
      // type = "单选题";
      quesSequenceDatas.value[0].lists.push(item.questionId);
      quesSequenceDatas.value[0].score += Number.parseInt(item.questionScore);
      quesSequenceDatas.value[0].quesScore.push(
        Number.parseInt(item.questionScore)
      );
      let questionAndOptions: any = extractQuestionAndOptions(
        item.questionDescription
      );
      if (questionAndOptions !== null) {
        danXuan.value.push(questionAndOptions);
      } else {
        // 处理无效数据，例如记录日志或发出警告
        console.warn("Invalid question data:", item.questionDescription);
      }
    } else {
      // type = "多选题";
      quesSequenceDatas.value[1].lists.push(item.questionId);
      quesSequenceDatas.value[1].score += Number.parseInt(item.questionScore);
      quesSequenceDatas.value[1].quesScore.push(
        Number.parseInt(item.questionScore)
      );
      let questionAndOptions: any = extractQuestionAndOptions(
        item.questionDescription
      );

      if (questionAndOptions !== null) {
        duoXuan.value.push(questionAndOptions);
      } else {
        // 处理无效数据，例如记录日志或发出警告
        console.warn("Invalid question data:", item.questionDescription);
      }
    }
  });
};

// 获取题目的答案
const getAnswer = (index: number, type: number, answer: string) => {
  quesSequenceDatas.value[type].answer[index] = answer;
  if (quesSequenceDatas.value[type].answer[index]) {
    if (type == 2) {
      if (quesSequenceDatas.value[type].answer[index] == "") {
        quesSequenceDatas.value[type].actives[index] = false;
      } else {
        quesSequenceDatas.value[type].actives[index] = true;
      }
    } else {
      quesSequenceDatas.value[type].actives[index] = true;
    }
  } else {
    quesSequenceDatas.value[type].actives[index] = false;
  }
};

const finishPaper = async () => {
  const resFinish = quesSequenceDatas.value;
  // console.log(resFinish[2]);
  // for (let i = 0; i < resFinish[2].answer.length; i++){
  //   console.log(resFinish[2].answer[i].length);
  //   if (resFinish[2].answer[i].length == 0) {
  //     return ElMessage.error("请作答完毕再交卷");
  //   }
  // }
  // 做完没
  let isSuccess = 0;
  if (
    resFinish[0].answer.length == resFinish[0].lists.length &&
    resFinish[1].answer.length == resFinish[1].lists.length &&
    resFinish[2].answer.length == resFinish[2].lists.length
  ) {
    console.log(quesDatas);
    console.log(resFinish);
    for (let type = 0; type < 3; type++) {
      for (let i = 0; i < resFinish[type].lists.length; i++) {
        try {
          const { msg, code } = (
            await addExamRecord(
              paperData.paperId,
              resFinish[type].lists[i],
              resFinish[type].answer[i],
              resFinish[type].quesScore[i],
              paperData.scoreExamId
            )
          ).data;
          console.log(msg, code);
        } catch (error) {
          console.log(error);
          return ElMessage.error("交卷失败，请稍后再试");
        }
      }
    }
    if (isSuccess == 0) {
      ElMessage.success("交卷成功");
      paperData.showFlag = true;
    } else {
      ElMessage.error("交卷失败，请稍后再试");
    }
  } else {
    ElMessage.error("请作答完毕再交卷");
  }
};
const getShowFlag = async (scoreExamId: Number) => {
  paperData.showFlag = (await isUserDoneExam(scoreExamId)).data.data;
};

// 获取消息框里面的内容
const last_textarea = ref();
// 获取聊天框盒子
const chatBox = ref();
// 发送消息
const sendMsg = async () => {
  const issueContent = last_textarea.value.value;
  if (issueContent != "") {
    let examineeID = sessionGetData("userid");
    let examID = paperData.scoreExamId;
    let proctorID = (await findProctorsByExamID(examID)).data.data.proctorId;
    const res = await addProctoringRecord(
      examineeID,
      examID,
      proctorID,
      issueContent,
      examineeID
    );
    // 发送成功的话
    if (!res.data.code) {
      last_textarea.value.value = "";
      // 重新获取消息列表
      getProctoringRecordsData();
    } else {
      ElMessage.warning("发送消息失败！");
    }
  } else {
    ElMessage.info("消息不能为空！");
  }
};

// 监考消息
const invigilatedMsy = ref<ProctoringRecord[]>([
  {
    ExamineeID: 1,
    ExamID: 1,
    proctorID: 3,
    issueContent: "怎么办",
    Time: "2023-10-27 04:08:27",
    senderID: 1,
  },
  {
    ExamineeID: 1,
    ExamID: 1,
    proctorID: 3,
    issueContent: "就这样",
    Time: "2023-10-27 04:08:27",
    senderID: 3,
  },
]);

// 获取监考记录
const getProctoringRecordsData = async () => {
  const res = await getProctoringRecords(paperData.scoreExamId);
  console.log(res);
  await waitData(res);
  if (chatBox.value?.scrollHeight) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

const waitData = (res: any) => {
  invigilatedMsy.value = res.data.data;
};
let timer: any;

const showPopover = () => {
  timer = setInterval(() => {
    getProctoringRecordsData();
  }, 1000);
};

onMounted(async () => {
  getQuesDataByPaperId(paperData.paperId);
  getShowFlag(paperData.scoreExamId);
  getProctoringRecordsData();
});

// 在弹出框隐藏后触发的自定义操作
const popoverHiddenHandler = () => {
  console.log("结束轮询");
  clearInterval(timer);
};
</script>
<template>
  <el-container v-if="!paperData.showFlag">
    <!-- <el-container v-if="paperData.showFlag"> -->
    <el-aside width="280px" class="quesSequenceBox">
      <div class="quesSequenceBox-title">题目序列</div>
      <quesSequence
        v-for="item in quesSequenceDatas"
        v-show="item.lists.length != 0"
        :quesSequenceData="item"
      />
      <el-button
        @click="finishPaper"
        v-if="
          sessionGetData('role') != 3 &&
          sessionGetData('role') != 2 &&
          sessionGetData('role') != 1
        "
        >交卷</el-button
      >
    </el-aside>
    <el-main class="createPaper">
      <div class="createPaper-info">
        <div class="createPaper-paperName">
          <h1>{{ paperData.examName }}</h1>
          <el-popover
            placement="right"
            :width="700"
            trigger="click"
            @hide="popoverHiddenHandler"
            @show="showPopover"
          >
            <template #reference>
              <div class="right" @click="getProctoringRecordsData">
                <svg
                  t="1667993211879"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2461"
                  width="128"
                  height="128"
                >
                  <path
                    d="M820.8896 807.9872H487.46496a39.64928 39.64928 0 0 0-22.58944 7.07072l-135.75168 94.13632a39.7056 39.7056 0 0 1-61.39392-24.19712l-10.10176-45.74208a39.7824 39.7824 0 0 0-38.80448-31.26784l0.19968-148.992a146.5344 146.5344 0 0 1 146.24256-146.62656h535.1168a39.82848 39.82848 0 0 1 39.74656 39.90528v136.00768a119.4752 119.4752 0 0 1-119.23968 119.7056z"
                    fill="#F4CA1C"
                    p-id="2462"
                  ></path>
                  <path
                    d="M815.39072 112.64H198.3744A157.83936 157.83936 0 0 0 40.96 270.55104v379.78112a157.84448 157.84448 0 0 0 157.4144 157.91104h14.79168a1.62816 1.62816 0 0 1 1.57696 1.27488l10.10688 45.71648a77.77792 77.77792 0 0 0 120.32 47.3856l135.78752-94.08512a1.62816 1.62816 0 0 1 0.9216-0.29184h333.5168A157.83936 157.83936 0 0 0 972.8 650.33216V270.55104A157.83936 157.83936 0 0 0 815.39072 112.64zM896.512 650.33216a81.35168 81.35168 0 0 1-81.13152 81.408H481.87904a77.42464 77.42464 0 0 0-44.27264 13.824L301.81888 839.68a1.61792 1.61792 0 0 1-2.50368-0.98816l-10.10688-45.71648a77.47584 77.47584 0 0 0-76.04736-61.23008h-14.78656a81.3568 81.3568 0 0 1-81.13664-81.408V270.55104a81.3568 81.3568 0 0 1 81.13664-81.408h617.01632a81.35168 81.35168 0 0 1 81.13152 81.408v379.78112zM337.98656 424.68352a49.24416 49.24416 0 1 0 49.08544 49.24416 49.152 49.152 0 0 0-49.08544-49.24416z m184.0896 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z m177.07008 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z"
                    fill="#595BB3"
                    p-id="2463"
                  ></path>
                </svg>
              </div>
            </template>
            <div class="InvigilationChat">
              <div class="InvigilationChat-container">
                <div class="chat_list_left">
                  <div class="chat_function">
                    <ul>
                      <li class="block select_choice_item">
                        <a href="javascript:void(0);">
                          <svg
                            t="1667993211879"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2461"
                            width="128"
                            height="128"
                          >
                            <path
                              d="M820.8896 807.9872H487.46496a39.64928 39.64928 0 0 0-22.58944 7.07072l-135.75168 94.13632a39.7056 39.7056 0 0 1-61.39392-24.19712l-10.10176-45.74208a39.7824 39.7824 0 0 0-38.80448-31.26784l0.19968-148.992a146.5344 146.5344 0 0 1 146.24256-146.62656h535.1168a39.82848 39.82848 0 0 1 39.74656 39.90528v136.00768a119.4752 119.4752 0 0 1-119.23968 119.7056z"
                              fill="#F4CA1C"
                              p-id="2462"
                            ></path>
                            <path
                              d="M815.39072 112.64H198.3744A157.83936 157.83936 0 0 0 40.96 270.55104v379.78112a157.84448 157.84448 0 0 0 157.4144 157.91104h14.79168a1.62816 1.62816 0 0 1 1.57696 1.27488l10.10688 45.71648a77.77792 77.77792 0 0 0 120.32 47.3856l135.78752-94.08512a1.62816 1.62816 0 0 1 0.9216-0.29184h333.5168A157.83936 157.83936 0 0 0 972.8 650.33216V270.55104A157.83936 157.83936 0 0 0 815.39072 112.64zM896.512 650.33216a81.35168 81.35168 0 0 1-81.13152 81.408H481.87904a77.42464 77.42464 0 0 0-44.27264 13.824L301.81888 839.68a1.61792 1.61792 0 0 1-2.50368-0.98816l-10.10688-45.71648a77.47584 77.47584 0 0 0-76.04736-61.23008h-14.78656a81.3568 81.3568 0 0 1-81.13664-81.408V270.55104a81.3568 81.3568 0 0 1 81.13664-81.408h617.01632a81.35168 81.35168 0 0 1 81.13152 81.408v379.78112zM337.98656 424.68352a49.24416 49.24416 0 1 0 49.08544 49.24416 49.152 49.152 0 0 0-49.08544-49.24416z m184.0896 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z m177.07008 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z"
                              fill="#595BB3"
                              p-id="2463"
                            ></path>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="chat_message_box">
                  <div class="first">
                    <div class="left" id="chatUsername">
                      {{ paperData.examName }}
                    </div>
                    <div class="right">
                      <svg
                        t="1666856821084"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2805"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M577.26464 209.52576a127.67232 127.67232 0 1 0-127.6672 127.60576 127.63648 127.63648 0 0 0 127.6672-127.60576z m163.13856 303.65696a127.67232 127.67232 0 1 0-127.67232 127.60576 127.6416 127.6416 0 0 0 127.67232-127.60576z m145.99168 301.29152A127.67232 127.67232 0 1 0 758.72256 942.08a127.63648 127.63648 0 0 0 127.67232-127.60576z"
                          fill="#F4CA1C"
                          p-id="2806"
                        ></path>
                        <path
                          d="M927.1552 244.7872H289.8176a35.39456 35.39456 0 1 1 0-70.79424h637.3376a35.39456 35.39456 0 1 1 0 70.79424zM146.432 209.408a42.496 42.496 0 1 0-42.496 42.496 42.496 42.496 0 0 0 42.496-42.496z m780.73856 341.5808H289.8176a35.39968 35.39968 0 1 1 0-70.79424h637.3376a35.39968 35.39968 0 1 1 0 70.77888zM146.432 515.584a42.496 42.496 0 1 0-42.496 42.496 42.496 42.496 0 0 0 42.496-42.496z m780.73856 332.73344H289.8176a35.39968 35.39968 0 1 1 0-70.79424h637.3376a35.39968 35.39968 0 1 1 0 70.784zM146.432 812.90752a42.496 42.496 0 1 0-42.496 42.496 42.496 42.496 0 0 0 42.496-42.496z"
                          fill="#595BB3"
                          p-id="2807"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="second_send">
                    <div class="container" ref="chatBox">
                      <div
                        class="message_wrapper"
                        v-for="item in invigilatedMsy"
                        :class="{
                          message_wrapper2:
                            item.senderID == sessionGetData('userid'),
                        }"
                      >
                        <div class="message">
                          <div class="left">
                            <a href="">
                              <img
                                v-if="item.proctorID != item.senderID"
                                src="../../assets/anchor-1.png"
                                alt=""
                              />
                              <img
                                v-if="item.proctorID == item.senderID"
                                src="../../assets/teather.png"
                                alt=""
                              />
                            </a>
                          </div>
                          <div class="right">
                            <div class="textmess_box">
                              <div class="text">
                                {{ item.issueContent }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="send_bottom">
                    <div class="container">
                      <div class="set">
                        <div class="icon">
                          <svg
                            t="1666858230685"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2264"
                            width="200"
                            height="200"
                          >
                            <path
                              d="M954.06592 738.9952a215.07072 215.07072 0 1 0-215.07072 215.07072 215.07072 215.07072 0 0 0 215.07072-215.07072z"
                              fill="#F4CA1C"
                              p-id="2265"
                            ></path>
                            <path
                              d="M514.56 952.32a437.76 437.76 0 1 1 437.76-437.76 438.272 438.272 0 0 1-437.76 437.76z m0-804.91008a367.1552 367.1552 0 1 0 367.1552 367.15008 367.56992 367.56992 0 0 0-367.1552-367.15008z m0 603.75552A220.99968 220.99968 0 0 1 293.8112 530.432a35.328 35.328 0 0 1 70.6048 0 150.144 150.144 0 1 0 300.28288 0 35.328 35.328 0 0 1 70.60992 0 221.0048 221.0048 0 0 1-220.7488 220.73344zM376.64256 369.78688a42.36288 42.36288 0 1 1-42.36288-42.36288 42.36288 42.36288 0 0 1 42.36288 42.36288z m356.56192 0a42.368 42.368 0 1 1-42.36288-42.36288 42.36288 42.36288 0 0 1 42.3424 42.36288z"
                              fill="#595BB3"
                              p-id="2266"
                            ></path>
                          </svg>
                        </div>
                        <div class="icon">
                          <svg
                            t="1666858365842"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2433"
                            width="200"
                            height="200"
                          >
                            <path
                              d="M266.42944 804.352l123.3408-136.82688a37.93408 37.93408 0 0 1 53.39136-2.90304l81.6896 72.83712a37.92384 37.92384 0 0 0 56.43776-6.76864l99.92704-145.04448a37.91872 37.91872 0 0 1 58.15808-5.12l86.33856 87.31136 66.64704 72.65792-13.9264 60.18048-67.30752 25.46176-529.20832 11.5712z"
                              fill="#F4CA1C"
                              p-id="2434"
                            ></path>
                            <path
                              d="M814.76096 148.48H209.23904A153.26208 153.26208 0 0 0 56.32 301.74208v415.40096A153.26208 153.26208 0 0 0 209.23904 870.4h605.52192A153.26208 153.26208 0 0 0 967.68 717.13792V301.74208A153.26208 153.26208 0 0 0 814.76096 148.48z m83.456 568.65792a83.62496 83.62496 0 0 1-83.456 83.62496H209.23904a83.62496 83.62496 0 0 1-83.456-83.62496V301.74208a83.62496 83.62496 0 0 1 83.456-83.63008h605.52192a83.62496 83.62496 0 0 1 83.456 83.61984v415.40096z m-137.728-298.55744a72.42752 72.42752 0 0 0-111.4112 9.87648l-99.712 145.46432a2.8672 2.8672 0 0 1-2.14528 1.29536 2.81088 2.81088 0 0 1-2.38592-0.75264L463.28832 501.41696a72.52992 72.52992 0 0 0-102.272 5.59104l-123.0848 137.216a34.77504 34.77504 0 1 0 51.67104 46.55616l123.0848-137.216a3.03104 3.03104 0 0 1 4.28544-0.2304l81.51552 73.04192a72.41728 72.41728 0 0 0 108.1088-13.02528l99.71712-145.4592a3.03104 3.03104 0 0 1 4.66432-0.41472l86.15936 87.552a34.78016 34.78016 0 1 0 49.47456-48.896z m-316.2368-33.32608a47.00672 47.00672 0 1 0-46.90432-47.00672 46.95552 46.95552 0 0 0 46.90432 47.00672z"
                              fill="#595BB3"
                              p-id="2435"
                            ></path>
                          </svg>
                        </div>
                        <div class="icon">
                          <svg
                            t="1666858497283"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="7426"
                            width="200"
                            height="200"
                          >
                            <path
                              d="M820.8896 807.9872H487.46496a39.64928 39.64928 0 0 0-22.58944 7.07072l-135.75168 94.13632a39.7056 39.7056 0 0 1-61.39392-24.19712l-10.10176-45.74208a39.7824 39.7824 0 0 0-38.80448-31.26784l0.19968-148.992a146.5344 146.5344 0 0 1 146.24256-146.62656h535.1168a39.82848 39.82848 0 0 1 39.74656 39.90528v136.00768a119.4752 119.4752 0 0 1-119.23968 119.7056z"
                              fill="#F4CA1C"
                              p-id="7427"
                            ></path>
                            <path
                              d="M815.39072 112.64H198.3744A157.83936 157.83936 0 0 0 40.96 270.55104v379.78112a157.84448 157.84448 0 0 0 157.4144 157.91104h14.79168a1.62816 1.62816 0 0 1 1.57696 1.27488l10.10688 45.71648a77.77792 77.77792 0 0 0 120.32 47.3856l135.78752-94.08512a1.62816 1.62816 0 0 1 0.9216-0.29184h333.5168A157.83936 157.83936 0 0 0 972.8 650.33216V270.55104A157.83936 157.83936 0 0 0 815.39072 112.64zM896.512 650.33216a81.35168 81.35168 0 0 1-81.13152 81.408H481.87904a77.42464 77.42464 0 0 0-44.27264 13.824L301.81888 839.68a1.61792 1.61792 0 0 1-2.50368-0.98816l-10.10688-45.71648a77.47584 77.47584 0 0 0-76.04736-61.23008h-14.78656a81.3568 81.3568 0 0 1-81.13664-81.408V270.55104a81.3568 81.3568 0 0 1 81.13664-81.408h617.01632a81.35168 81.35168 0 0 1 81.13152 81.408v379.78112zM337.98656 424.68352a49.24416 49.24416 0 1 0 49.08544 49.24416 49.152 49.152 0 0 0-49.08544-49.24416z m184.0896 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z m177.07008 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z"
                              fill="#595BB3"
                              p-id="7428"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="last_textarea">
                        <textarea
                          name=""
                          ref="last_textarea"
                          cols="30"
                          rows="10"
                        ></textarea>
                        <div class="send" @click="sendMsg">发送</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
        <!-- <div class="createPaper-detail">
          <div class="createPaper-detail-starttime createPaper-detail-common">
            <el-icon class="examicon" color="#626aef"><Loading /></el-icon>
            2023-15-40
          </div>
          <div class="createPaper-detail-duration createPaper-detail-common">
            <el-icon class="examicon" color="#626aef"><Clock /></el-icon>
            限时90分钟
          </div>
          <div
            class="createPaper-detail-numberOfExam createPaper-detail-common"
          >
            <el-icon class="examicon" color="#626aef"><UserFilled /></el-icon>
            考试人数：1人
          </div>
        </div> -->
      </div>

      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[0].lists.length">
        一. 单选题（共{{ quesSequenceDatas[0].lists.length }}题，{{
          quesSequenceDatas[0].score
        }}分）
      </h1>
      <multipleChoice
        v-for="(item, index) in danXuan"
        :type="0"
        :key="index"
        :index="index"
        :danxuan="item"
        :getAnswer="getAnswer"
      />
      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[1].lists.length">
        二. 多选题（共{{ quesSequenceDatas[1].lists.length }}题，{{
          quesSequenceDatas[1].score
        }}分）
      </h1>
      <multipleChoice
        v-for="(item, index) in duoXuan"
        :type="1"
        :key="index"
        :index="index"
        :danxuan="item"
        :getAnswer="getAnswer"
      />
      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[2].lists.length">
        三. 主观题（共{{ quesSequenceDatas[2].lists.length }}题，{{
          quesSequenceDatas[2].score
        }}分）
      </h1>
      <subQuestions
        v-for="(item, index) in subText"
        :type="21"
        :key="index"
        :index="index"
        :subText="item"
        :getAnswer="getAnswer"
        s
      />
    </el-main>
  </el-container>
  <div class="flagText" v-if="paperData.showFlag">
    <h1 style="display: flex">您已经交卷！不可再次修改答案</h1>
  </div>
</template>
<style>
.flagText {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: red;
}

.quesSequenceBox {
  display: flex;
  flex-direction: column;
}
</style>
