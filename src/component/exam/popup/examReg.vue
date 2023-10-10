<script lang="ts" setup>
import "../../../sass/exam/popup/examReg.scss";
import { registerExam } from "../../../request/api/exam/examRegistration.ts";
import { ElMessage } from "element-plus";

const props = defineProps(["examRegData"]);
let tableData = [
  {
    id: 1,
    title: "客观题",
    value: props.examRegData.objectiveScore,
  },
  {
    id: 2,
    title: "主观题",
    value: props.examRegData.subjectiveScore,
  },
  {
    id: 3,
    title: "报考人数",
    value: props.examRegData.numberOfExaminees,
  },
  {
    id: 4,
    title: "开始时间",
    value: props.examRegData.startTime,
  },
  {
    id: 5,
    title: "结束时间",
    value: props.examRegData.endTime,
  },
];

const regExam = async () => {
  let res = await registerExam(props.examRegData.examID);
  if (res.data.code) {
    ElMessage.warning(res.data.msg);
  } else {
    ElMessage.success(res.data.data);
  }
};
</script>
<template>
  <div class="testInfo">
    <div class="testInfo-title">
      <h1>{{ props.examRegData.examName }}</h1>
    </div>
    <el-table
      :show-header="false"
      :data="tableData"
      border
      style="margin: 20px; width: 381px"
    >
      <el-table-column
        width="180"
        prop="title"
        align="center"
      ></el-table-column>
      <el-table-column
        width="200"
        prop="value"
        align="center"
      ></el-table-column>
    </el-table>

    <el-button class="search" type="primary" @click="regExam"
      >立即报名</el-button
    >
  </div>
</template>
