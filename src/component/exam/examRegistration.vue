<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import "../../sass/exam/examRegistration.scss";
import ExamReg from "./popup/examReg.vue";
import cloneDeep from "lodash/cloneDeep";
import { onMounted } from "vue";
import { getAllExams } from "../../request/api/exam/examRegistration";
import { watchEffect } from "vue";

interface ExamRegInfo {
  examID: string;
  examName: string;
  startTime: string;
  endTime: string;
  numberOfExaminees: string;
  objectiveScore: Number;
  subjectiveScore: Number;
  createdBy: string;
}

const allExamRegInfo = ref<ExamRegInfo[]>([]);

const state = reactive({
  search: "",
  tableData: cloneDeep(allExamRegInfo.value),
  examReg: false,
});

// 搜索
const onSearch = () => {
  if (state.search.length > 0) {
    // 进行模糊查询并赋值给 tableData
    state.tableData = filteredData.value;
  } else {
    // 当 form.data 为空时，赋值为 allTableDate
    state.tableData = allExamRegInfo.value;
  }
};

const clearSearch = () => {
  if (state.search.length == 0) {
    // 当 form.data 为空时，赋值为 allTableDate
    state.tableData = allExamRegInfo.value;
  }
};

// 报名
const examRegData = ref<ExamRegInfo>();
const handleReg = (_index: any, row: ExamRegInfo) => {
  examRegData.value = { ...row };
  state.examReg = true;
};

// 定义模糊查询的 computed 属性
const filteredData = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = state.search.toLowerCase(); // 将查询字符串转换为小写
  return state.tableData.filter((item) => {
    // 根据题目内容和题目类型进行模糊查询
    return item.examName.toLowerCase().includes(searchData);
  });
});

onMounted(() => {
  // 获取考试列表
  const getExamList = async () => {
    try {
      let res = await getAllExams();
      allExamRegInfo.value = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  getExamList();
});

// 在数据变化时重新渲染视图
watchEffect(() => {
  state.tableData = cloneDeep(allExamRegInfo.value);
});
</script>

<template>
  <div>
    <!-- 考试报名 -->
    <div class="examRegistration">
      <el-form
        :inline="true"
        :model="state"
        class="examRegistration-form"
        size="large"
      >
        <el-form-item label="查询考试：">
          <el-input
            v-model="state.search"
            placeholder="请输入相关考试名称"
            @input="clearSearch"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="search" type="primary" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="state.tableData"
        max-height="555"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="examID"
          label="考试ID"
          align="center"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="examName"
          label="考试名称"
          align="center"
          width="150px"
        >
        </el-table-column>
        <el-table-column prop="startTime" label="考试开始时间" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="考试结束时间" align="center">
        </el-table-column>
        <el-table-column
          prop="numberOfExaminees"
          label="考试报考人数"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="createdBy" label="创建人" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template #default="scope">
            <el-button
              class="search"
              type="primary"
              @click="handleReg(scope.$index, scope.row)"
              >报名</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="考试报名" v-model="state.examReg" width="540px">
        <ExamReg :examRegData="examRegData"></ExamReg>
      </el-dialog>
    </div>
  </div>
</template>
