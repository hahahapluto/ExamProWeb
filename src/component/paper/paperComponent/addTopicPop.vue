<script lang="ts" setup>
import "../../../sass/paper/addTopicPop.scss";
import { ElButton } from "element-plus";
import { ref, reactive } from "vue";

const multipleSelection = ref([]);
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
};

// 题库
const questionBank = ref("");
// 题库列表
const questionBankOptions = reactive([
  {
    value: "选项1",
    label: "黄金糕",
  },
  {
    value: "选项2",
    label: "双皮奶",
  },
  {
    value: "选项3",
    label: "蚵仔煎",
  },
  {
    value: "选项4",
    label: "龙须面",
  },
  {
    value: "选项5",
    label: "北京烤鸭",
  },
]);

// 题目列表
const toppicTableData = reactive([
  {
    QuestionType: "2016-05-03",
    QuestionDescription: "王小虎",
    createTime: "上海市普陀区金沙江路 1518 弄",
  },
  {
    QuestionType: "2016-05-03",
    QuestionDescription: "王小虎",
    createTime: "上海市普陀区金沙江路 1518 弄",
  },
  {
    QuestionType: "2016-05-03",
    QuestionDescription: "王小虎",
    createTime: "上海市普陀区金沙江路 1518 弄",
  },
  {
    QuestionType: "2016-05-03",
    QuestionDescription: "王小虎",
    createTime: "上海市普陀区金沙江路 1518 弄",
  },
]);
</script>
<template>
  <div class="addTopicPop">
    <div class="addTopicPop-options">
      <ElButton class="addTopicPop-options-ques" size="large"
        >全部试题</ElButton
      >
      <el-select
        v-model="questionBank"
        placeholder="请选择题库"
        class="addTopicPop-options-bank"
        size="large"
      >
        <el-option
          v-for="item in questionBankOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <el-table
      ref="multipleTable"
      :data="toppicTableData"
      tooltip-effect="dark"
      border
      style="width: 100%; margin-top: 30px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="QuestionType" label="题型" width="120">
      </el-table-column>
      <el-table-column
        prop="QuestionDescription"
        label="题目"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200">
      </el-table-column>
    </el-table>

    <span class="addTopicPop-footer">
      <el-button @click="">取 消</el-button>
      <el-button type="primary" @click="">确 定</el-button>
    </span>
  </div>
</template>
