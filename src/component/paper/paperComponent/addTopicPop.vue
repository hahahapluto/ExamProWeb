<script lang="ts" setup>
import { ElButton, ElMessage } from "element-plus";
import { Ref, onMounted, ref, watch } from "vue";
import { getMyBank, getQuesInBankPass } from "../../../request/api/paper/bank";
import { addQuesIntoPaper } from "../../../request/api/paper/paper";
import { getQuesPass } from "../../../request/api/paper/question";
import "../../../sass/paper/addTopicPop.scss";
import pinia from "../../../stores";
import paperStore from "../../../stores/paperStore";
import { formatDateTime } from "../../../utils/common";
import { formatExamString, formatExamString2 } from "../../../utils/question";

const paperData = paperStore(pinia);
const props = defineProps(["cancelDialogForm", "getQuesDataByPaperId"]);

// 获取当前选择的选项
const multipleSelection = ref([]);
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
};

interface questionBankOption {
  bankId: string;
  bankName: string;
}

interface question {
  createTime: string;
  description: string;
  questionId: string;
  type: string;
  questionStore: string;
}

// 题库
const questionBank = ref();
// 题库列表
const questionBankOptions = ref<questionBankOption[]>([]);

const getQuestionBankOptions = async () => {
  let res = await getMyBank();
  questionBankOptions.value = res.data.data;
};

// 题目列表
const toppicTableData: Ref<any[]> = ref([]);
// const toppicTableData = ref([]);

const getQuesInBankData = async (questionBankId: Number) => {
  const res = await getQuesInBankPass(questionBankId);
  toppicTableData.value = res.data.data;
  console.log(toppicTableData.value);

  toppicTableData.value.forEach(
    (item: { type: string; description: string }) => {
      if (item.type == "0") {
        item.type = "主观题";
      } else if (item.type == "1") {
        item.type = "单选题";
        item.description = formatExamString(item.description);
      } else {
        item.type = "多选题";
        item.description = formatExamString(item.description);
      }
    }
  );
};

watch(
  () => questionBank.value,
  () => {
    getQuesInBankData(questionBank.value);
  }
);

// 获取全部题目
const getAllQuesData = async () => {
  const res = await getQuesPass();
  const needFormatData = res.data.data;
  let maps: question[] = [] as any[];
  needFormatData.forEach(
    (item: {
      createTime: string;
      questionDescription: string;
      questionId: string;
      questionType: string;
    }) => {
      const map: question = {
        createTime: "",
        description: "",
        questionId: "",
        type: "",
        questionStore: "",
      };
      map.createTime = formatDateTime(item.createTime);
      map.description = item.questionDescription;
      map.questionId = item.questionId;
      map.type = item.questionType;
      map.questionStore = item.questionScore;
      maps.push(map);
    }
  );

  toppicTableData.value = maps as any[];

  toppicTableData.value.forEach((item: question) => {
    const type = item.type;
    if (type === "0") {
      item.type = "主观题";
    } else if (type === "1") {
      item.type = "单选题";
      item.description = formatExamString2(item.description);
    } else {
      item.type = "多选题";
      item.description = formatExamString2(item.description);
    }
  });
};

// 点击获取所有题目
const onclick_allques = () => {
  getAllQuesData();
};

// 添加选中题目进试卷
const addQuesIntoPaperData = async () => {
  const backendData = multipleSelection.value.map((item: question) => {
    let type = "";
    if (item.type === "主观题") {
      type = "0";
    } else if (item.type === "单选题") {
      type = "1";
    } else {
      type = "2";
    }
    return {
      paperid: paperData.paperId,
      questionid: item.questionId,
      questiontype: type,
      score: item.questionStore,
    };
  });

  const res = await addQuesIntoPaper(backendData);
  if (!res.data.code) {
    ElMessage.success(res.data.msg);
    props.getQuesDataByPaperId(paperData.paperId);
    props.cancelDialogForm();
  } else {
    ElMessage.warning(res.data.msg);
  }
};

// 获取数据
onMounted(() => {
  getQuestionBankOptions();
  getAllQuesData();
});
</script>
<template>
  <div class="addTopicPop">
    <div class="addTopicPop-options">
      <ElButton
        class="addTopicPop-options-ques"
        size="large"
        @click="onclick_allques"
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
          :key="item.bankId"
          :label="item.bankName"
          :value="item.bankId"
        >
        </el-option>
      </el-select>
    </div>

    <el-table
      ref="multipleTable"
      :data="toppicTableData"
      tooltip-effect="dark"
      border
      style="width: 100%; margin-top: 30px; height: 300px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="type" label="题型" width="120"> </el-table-column>
      <el-table-column prop="description" label="题目" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="questionStore" label="题目分数" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200">
      </el-table-column>
    </el-table>
    <span class="addTopicPop-footer">
      <el-button @click="props.cancelDialogForm">取 消</el-button>
      <el-button type="primary" @click="addQuesIntoPaperData">确 定</el-button>
    </span>
  </div>
</template>
