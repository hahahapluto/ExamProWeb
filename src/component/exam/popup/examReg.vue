<script setup>
import "../../../sass/exam/popup/examReg.scss";
import { reactive } from "vue";

let tableData = [
  {
    id: 1,
    title: "单选题",
    value: 1,
  },
  {
    id: 2,
    title: "多选题",
    value: 2,
  },
  {
    id: 3,
    title: "主观题",
    value: 3,
  },
  {
    id: 4,
    title: "开始时间",
    value: 4,
  },
  {
    id: 5,
    title: "结束时间",
    value: 5,
  },
];
let originTitle = ["题型", "均分"];
let transTitle = ["语文考试信息"];
</script>
<template>
  <div class="testInfo">
    <div class="testInfo-title">
      <h1>语文考试信息</h1>
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

    <el-button
      class="search"
      type="primary"
      @click="handleReg(scope.$index, scope.row)"
      >立即报名</el-button
    >
  </div>
</template>
