<script lang="ts" setup>
import { ref } from "vue";
import "../../sass/paper/createPaper.scss";
import quesSequence from "./paperComponent/quesSequence.vue";
import addTopicPop from "./paperComponent/addTopicPop.vue";
import multipleChoice from "./paperComponent/multipleChoice.vue";
import subQuestions from "./paperComponent/subQuestions.vue";
import { quesSequenceType } from "../../types/paper";
import pinia from "../../stores";
import paperStore from "../../stores/paperStore";
import { findQuesByPaperId } from "../../request/api/paper/paper";
import { onMounted } from "vue";

interface quesData {
  questionId: number;
  questionType: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: string;
}

const paperData = paperStore(pinia);
// 左侧-题目序列数据
const quesSequenceDatas = ref<quesSequenceType[]>([
  {
    name: "单选题",
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
  },
  {
    name: "多选题",
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
  },
  {
    name: "主观题",
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
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
const danXuan = ref<string[][]>([]);
// 多选题内容
const duoXuan = ref<string[][]>([]);
// 主观题内容
const subText = ref<string[]>([]);
// 试卷的题目数据
let quesDatas: quesData[] = [];
// 获取试卷的题目数据
const getQuesDataByPaperId = async (paperId: Number) => {
  console.log("获取试卷题目");
  let res = await findQuesByPaperId(paperId);
  quesDatas = res.data.data;

  quesDatas.map((item: quesData) => {
    if (item.questionType === "0") {
      // type = "主观题";
      quesSequenceDatas.value[2].lists.push(item.questionId);
      quesSequenceDatas.value[2].score += Number.parseInt(item.questionScore);
      subText.value.push(item.questionDescription);
    } else if (item.questionType === "1") {
      // type = "单选题";
      console.log(1111);

      quesSequenceDatas.value[0].lists.push(item.questionId);
      quesSequenceDatas.value[0].score += Number.parseInt(item.questionScore);
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

// 选择了题目序列active
const multipleChoice_active = (index: number, type: number) => {
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

// 获取题目的答案
const getAnswer = (index: number, type: number, answer: string) => {
  quesSequenceDatas.value[type].answer[index] = answer;
};

// 是否显示添加题目的弹出框
const dialogFormVisible = ref(false);
// 取消显示添加题目的弹出框
const cancelDialogForm = () => {
  dialogFormVisible.value = false;
};

onMounted(() => {
  getQuesDataByPaperId(paperData.paperId);
});
</script>
<template>
  <el-container>
    <el-aside width="280px" class="quesSequenceBox">
      <div class="quesSequenceBox-title">题目序列</div>
      <quesSequence
        v-for="item in quesSequenceDatas"
        v-show="item.lists.length != 0"
        :quesSequenceData="item"
      />
    </el-aside>
    <el-main class="createPaper">
      <div class="createPaper-info">
        <div class="createPaper-paperName">
          <h1>{{ paperData.paperName }}</h1>
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
      <div class="createPaper-addTopic" @click="dialogFormVisible = true"></div>
      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[0].lists.length">
        一. 单选题（共{{ quesSequenceDatas[0].lists.length }}题，{{
          quesSequenceDatas[0].score
        }}分）
      </h1>
      <multipleChoice
        v-for="(item, index) in danXuan"
        @click="multipleChoice_active(index, 0)"
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
        @click="multipleChoice_active(index, 1)"
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
        @click="multipleChoice_active(index, 2)"
        v-for="(item, index) in subText"
        :type="21"
        :key="index"
        :index="index"
        :subText="item"
        :getAnswer="getAnswer"
        s
      />
    </el-main>
    <el-dialog title="添加题目" v-model="dialogFormVisible" width="945px">
      <addTopicPop
        :cancelDialogForm="cancelDialogForm"
        :getQuesDataByPaperId="getQuesDataByPaperId"
      />
    </el-dialog>
  </el-container>
</template>
