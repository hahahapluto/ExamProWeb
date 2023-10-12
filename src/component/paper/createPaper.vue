<script lang="ts" setup>
import { ref } from "vue";
import "../../sass/paper/createPaper.scss";
import quesSequence from "./paperComponent/quesSequence.vue";
import topic from "./paperComponent/multipleChoice.vue";
import { quesSequenceType } from "../../types/paper";

// 左侧-题目序列数据
const quesSequenceDatas = ref<quesSequenceType[]>([
  {
    name: "单选题",
    score: "0分",
    lists: [1, 2, 1, 2, 4, 5],
  },
  {
    name: "多选题",
    score: "0分",
    lists: [3],
  },
  {
    name: "主观题",
    score: "0分",
    lists: [],
  },
]);
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
          <h1>数学考试</h1>
        </div>
        <div class="createPaper-detail">
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
        </div>
      </div>
      <div class="createPaper-addTopic"></div>
      <h1 style="margin: 20px 20px">一. 单选题（共8题，40分）</h1>
      <topic />
      <topic />
    </el-main>
  </el-container>
</template>
