<script setup lang="ts">
import { ref } from "vue";
import "../../sass/invigilate/invigilate.scss";
import pinia from "../../stores";
import paperStore from "../../stores/paperStore";
import { myExamType } from "../../types/exam";
import examItem from "../paper/exam/examItem.vue";
import { getExamsByProctorID } from "../../request/api/invigilate/invigilate";

const paperData = paperStore(pinia);
let examData: myExamType[] = [];
let tableData = ref<myExamType[]>([]);

const getExamData = async () => {
  // 获取个人的考试
  examData = (await getExamsByProctorID()).data.data;
  tableData.value = examData;
};

function getExamStatus(startTimeStr: string, durationMinutes: number) {
  // 将输入的开始时间字符串转换为日期对象
  const startTime = new Date(startTimeStr);
  // 获取当前时间
  const currentTime = new Date();
  // 计算结束时间
  const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);
  if (currentTime < startTime) {
    // 考试未开始
    return "未开始";
  } else if (currentTime >= startTime && currentTime <= endTime) {
    // 考试进行中
    return "考试中";
  } else {
    // 考试已结束
    return "已结束";
  }
}

// 响应式变量，用于存储当前选择的状态，默认为"全部"
const selectedState = ref("全部");
getExamData();
const chooseStates = (state: string) => {
  selectedState.value = state;
  if (state == "全部") {
    return (tableData.value = examData);
  }
  tableData.value = examData.filter(
    (item: { startTime: string; examDuration: number }) => {
      return getExamStatus(item.startTime, item.examDuration) == state;
    }
  );
};

// 进入监考聊天框
const enterInvigilationChat = ($router: any, index: number) => {
  paperData.paperId = tableData.value[index].paperID;
  paperData.paperName = tableData.value[index].examName;
  paperData.scoreExamId = tableData.value[index].examID;
  console.log("???" + paperData.paperName);

  $router.push("/index/InvigilationChat");
};
</script>
<template>
  <div class="invigilate">
    <div class="selectbox">
      <div class="selector">
        <div class="selector-left">
          <div
            class="selector-left-item"
            @click="chooseStates('全部')"
            :class="{ selected: selectedState === '全部' }"
          >
            全部
          </div>
          <div
            class="selector-left-item"
            @click="chooseStates('未开始')"
            :class="{ selected: selectedState === '未开始' }"
          >
            未开始
          </div>
          <div
            class="selector-left-item"
            @click="chooseStates('考试中')"
            :class="{ selected: selectedState === '考试中' }"
          >
            已开始
          </div>
          <div
            class="selector-left-item"
            @click="chooseStates('已结束')"
            :class="{ selected: selectedState === '已结束' }"
          >
            已过期
          </div>
        </div>
        <div class="selector-right">
          <div class="selector-right-input"></div>
          <div class="selector-right-button"></div>
        </div>
      </div>
      <div class="show">
        <el-input class="w-50 m-2 show-input" placeholder="请输入考试名称" />
        <el-button
          class="show-button"
          color="#626aef"
          style="color: aliceblue"
          size="large"
          >搜索考试</el-button
        >
      </div>
    </div>
    <!-- 在线考试 -->
    <div class="showbox">
      <div class="showbox-exam">
        <examItem
          v-for="(item, index) in tableData"
          :tableData="item"
          @click="enterInvigilationChat($router, index)"
        ></examItem>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
