<script lang="ts" setup>
import { toRaw } from "@vue/reactivity";
import type { FormInstance } from "element-plus";
import { ElMessage, ElTable, FormRules } from "element-plus";
import cloneDeep from "lodash/cloneDeep";
import { computed, reactive, ref } from "vue";
import { addQuesInBank, getMyBank } from "../../request/api/paper/bank";
import { addQuestion, getMyQuestion } from "../../request/api/paper/question";
import "../../sass/index/paper/addQues.scss";
import "../../sass/index/paper/question.scss";
import {
  commonRules,
  formatExamString,
  getOption,
  getQues,
} from "../../utils/question";

interface Ques {
  type: string;
  description: string;
  createTime: string;
  questionId: Number;
  answer: string;
  questionscore: string;
  juniorState: string;
}
// 上面筛选的两个表格的信息 data:搜索内容 type:题目类型
const form = reactive({
  data: "",
  type: "请选择题目类型",
});

// let allTableDate: any = myQuestionList.value;
let allTableData: any = ref<Ques[]>();
// 深拷贝，初始的表格数据时全部的个人数据
let tableData: any = ref<Ques[]>();

// tableData = myQuestionList;
const AllQuestion = async () => {
  allTableData = (await getMyQuestion()).data.data;
  console.log(allTableData);
  allTableData.forEach(
    (item: { type: string; description: string; juniorState: string }) => {
      if (item.type == "0") {
        item.type = "主观题";
      } else if (item.type == "1") {
        item.type = "单选题";
        item.description = formatExamString(item.description);
      } else {
        item.type = "多选题";
        item.description = formatExamString(item.description);
      }
      item.juniorState = filterState(item.juniorState);
    }
  );
  // console.log(allTableData)
  tableData.value = cloneDeep(allTableData);
};
AllQuestion();

// 表格的试题信息
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
// 题的类型？
const multipleSelection = ref<Ques[]>([]);

// 可以用于选择固定的第几位 修改成clear all
const toggleSelection = () => {
  multipleTableRef.value!.clearSelection();
};

// handleSelectionChange：选中了几个题目并存放在value中
const handleSelectionChange = (val: Ques[]) => {
  // console.log('handleSelectionChange', val)
  multipleSelection.value = val;
};
const selectBank = ref("");
// 将选择的试题添加到题库
let openToAddBank = async function async() {
  console.log(selectBank.value);
  if (selectBank.value == "") return ElMessage.warning("未选择题目");
  console.log(multipleSelection.value);
  const selectQues = toRaw(multipleSelection.value);
  if (selectQues.length == 0) return ElMessage.warning("未选择题目");
  for (let item of selectQues) {
    console.log(item.questionId);
    const { data, code, msg } = (
      await addQuesInBank(Number.parseInt(selectBank.value), item.questionId)
    ).data;
    console.log(data, msg);
    if (!data || code != 0) {
      ElMessage.warning(msg);
    } else {
      ElMessage.success(msg);
    }
  }
  // addQuesInBank()
  console.log(selectQues);
};

// 根据form.data搜索对应的题目
const searchQuesByInput = function searchQuesByInput() {
  console.log(form.data);
  console.log(filteredData.value);
  if (form.data.length > 0) {
    // 进行模糊查询并赋值给 tableData
    tableData.value = filteredData.value;
  } else {
    // 当 form.data 为空时，赋值为 aqllTableDate
    tableData.value = allTableData;
  }
};

// 根据from.type搜索对应的题目
const searchQuesBySelect = function searchQuesBySelect() {
  if (form.type !== "0") {
    tableData.value = filteredType.value;
  } else {
    tableData.value = allTableData;
  }
};

// 定义模糊查询的 computed 属性
const filteredData = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.data.toLowerCase(); // 将查询字符串转换为小写
  return tableData.value.filter((item: Ques) => {
    // 根据题目内容和题目类型进行模糊查询
    return item.description.toLowerCase().includes(searchData);
  });
});

// 根据对应的type显示对应的题目内容
const filteredType = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.type; // 将查询字符串转换为小写
  return allTableData.filter((item: any) => {
    if (searchData == "1") {
      return item.type == "主观题";
    } else if (searchData == "2") {
      return item.type == "单选题";
    } else if (searchData == "3") {
      return item.type == "多选题";
    } else {
      return "";
    }
  });
});

const filterState = (juniorState: string) => {
  if (juniorState == "0") {
    return "未审核";
  } else if (juniorState == "1") {
    return "已通过";
  } else {
    return "未通过";
  }
};

// 定义获取状态样式类的函数
const getStatusClass = (status: string) => {
  if (status === "未审核") {
    return "status-gray";
  } else if (status === "已通过") {
    return "status-orange";
  } else {
    return "status-red";
  }
};

let dialogFormVisible = ref(false);
const formLabelWidth = "140px";

// 新增题目 （exampro）无意义用于区分题目和选项
const addQnes = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 首先调用表单验证
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");
      // 主观题 subjective
      let QuestionDescription: string = "";
      let QuestionAnswer: string = "";

      if (dialogForm.qtype === "1") {
        QuestionDescription = dialogForm.subjective.sdescribe;
        QuestionAnswer = dialogForm.subjective.sanswer;
      } else if (dialogForm.qtype === "2") {
        //单选
        QuestionDescription = `${dialogForm.radio.rdescribe}(exampro)A=${dialogForm.radio.rchoose.A}&B=${dialogForm.radio.rchoose.B}&C=${dialogForm.radio.rchoose.C}&D=${dialogForm.radio.rchoose.D}`;
        QuestionAnswer = dialogForm.radio.ranswer;
      } else {
        QuestionDescription = `${dialogForm.multiple.mdescribe}(exampro)A=${dialogForm.multiple.mchoose.A}&B=${dialogForm.multiple.mchoose.B}&C=${dialogForm.multiple.mchoose.C}&D=${dialogForm.multiple.mchoose.D}`;
        // 多选的答案是数组，需要
        QuestionAnswer = dialogForm.multiple.manswer.join();
      }
      const qusetionMessage = {
        // 题目类型
        QuestionType: (parseInt(dialogForm.qtype) - 1).toString(),
        // 题目描述
        QuestionDescription,
        // 题目答案
        QuestionAnswer,
        questionscore: dialogForm.questionscore,
      };
      console.log(qusetionMessage);
      //发送添加题目请求
      const { code, msg } = (
        await addQuestion(
          (parseInt(dialogForm.qtype) - 1).toString(),
          QuestionDescription,
          QuestionAnswer,
          dialogForm.questionscore
        )
      ).data;
      if (code == 0) {
        console.log("插入成功", 0);
        // 刷新列表
        AllQuestion();
        // 成功弹窗
        ElMessage.success(msg);
        // 表单重置
        formEl.resetFields();
      }
      dialogFormVisible.value = false;
    } else {
      console.log("error submit!", fields);
      return;
    }
  });
};

// 定义表单不能为空的验证规则

// 定义规则的接口
interface RuleForm {
  qtype: string; //类型
  subjective: {
    // 主观题题目内容subjective
    sdescribe: string;
    sanswer: string; //主观题答案
  };
  radio: {
    // 单选题目描述 Radio
    rdescribe: string;
    roption: string;
    rchoose: {
      //选择题每一个选项
      A: string;
      B: string;
      C: string;
      D: string;
    };
    ranswer: string; //单选答案
  };
  multiple: {
    mdescribe: string; // 多选题目描述 Multiple selection
    moption: string;
    mchoose: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    manswer: string[]; //多选答案,
  };
  questionscore: string;
}

// 获取表单的ref
const ruleFormRef = ref<FormInstance>();

const dialogForm = reactive({
  qtype: "1", //类型
  subjective: {
    // 主观题题目内容subjective
    sdescribe: "",
    sanswer: "", //主观题答案
  },
  radio: {
    // 单选题目描述 Radio
    rdescribe: "",
    rchoose: {
      //选择题每一个选项
      A: "",
      B: "",
      C: "",
      D: "",
    },
    ranswer: "", //单选答案
  },
  multiple: {
    mdescribe: "", // 多选题目描述 Multiple selection
    moption: "",
    mchoose: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    manswer: [], //多选答案
  },
  questionscore: "",
});

const rules = reactive<FormRules<RuleForm>>({
  qtype: commonRules("题目类型", "change"),
  // 主观题
  "subjective.sdescribe": commonRules("题目内容", "blur"),
  "subjective.sanswer": commonRules("题目答案", "blur"),
  "radio.rdescribe": commonRules("题目内容", "blur"),
  "radio.rchoose.A": commonRules("A选项", "blur"),
  "radio.rchoose.B": commonRules("B选项", "blur"),
  "radio.rchoose.C": commonRules("C选项", "blur"),
  "radio.rchoose.D": commonRules("D选项", "blur"),
  "radio.ranswer": commonRules("题目答案", "change"),
  "multiple.mdescribe": commonRules("题目内容", "blur"),
  "multiple.mchoose.A": commonRules("A选项", "blur"),
  "multiple.mchoose.B": commonRules("B选项", "blur"),
  "multiple.mchoose.C": commonRules("C选项", "blur"),
  "multiple.mchoose.D": commonRules("D选项", "blur"),
  "multiple.manswer": commonRules("题目答案", "change"),
  questionscore: commonRules("题目分值", "blur"),
});
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  // formEl.resetFields()
};
interface bankInterface {
  bankId: Number;
  bankName: string;
}
let bankData: any = ref<bankInterface[]>();

// 获取题库信息
const getBankData = async () => {
  bankData.value = (await getMyBank()).data.data;
  console.log(bankData);
};
getBankData();
</script>

<template>
  <div>
    <!-- 筛选试题信息 -->
    <div class="selector">
      <el-form :model="form" class="selector-form" size="large">
        <el-form-item class="selector-form-item">
          <el-input
            v-model="form.data"
            class="selector-form-item-input"
            placeholder="搜索题目内容"
            @input="searchQuesByInput"
          />
        </el-form-item>
        <el-form-item class="selector-form-item">
          <el-select
            v-model="form.type"
            placeholder="please select your zone"
            class="selector-form-item-select"
            @change="searchQuesBySelect"
          >
            <el-option label="全部" value="0" />
            <el-option label="主观题" value="1" />
            <el-option label="单选题" value="2" />
            <el-option label="多选题" value="3" />
          </el-select>
        </el-form-item>
        <el-row class="mb-4">
          <el-button
            type="primary"
            color="#626aef"
            style="color: aliceblue"
            icon="plus"
            @click="dialogFormVisible = true"
          >
            新增题目
          </el-button>
          <!-- @click="jumpPath($router,'question/add')" -->
        </el-row>
      </el-form>
    </div>
    <!-- 试题信息 -->
    <div class="form">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%; height: 500px"
        @selection-change="handleSelectionChange"
        class="from-table"
        :row-style="{ height: '50px' }"
        border
      >
        <el-table-column type="expand" width="50" align="center">
          <template #default="props">
            <div style="display: flex; padding: 10px">
              <div class="des">
                <div class="des-left">题干</div>
                <div class="des-right">
                  <p class="des-right-pp">
                    {{ getQues(props.row.description) }}
                  </p>
                  <p v-if="props.row.type !== '主观题'" class="des-right-p">
                    A、 {{ getOption("A=", props.row.description) }}
                  </p>
                  <p v-if="props.row.type !== '主观题'" class="des-right-p">
                    B、 {{ getOption("B=", props.row.description) }}
                  </p>
                  <p v-if="props.row.type !== '主观题'" class="des-right-p">
                    C、 {{ getOption("C=", props.row.description) }}
                  </p>
                  <p v-if="props.row.type !== '主观题'" class="des-right-p">
                    D、 {{ getOption("D=", props.row.description) }}
                  </p>
                </div>
              </div>
              <div class="answ">
                <div class="answ-box score">
                  <div class="answ-box-left">分值</div>
                  <p class="answ-box-right-p">{{ props.row.questionStore }}</p>
                </div>
                <div class="answ-box">
                  <div class="answ-box-left">答案</div>
                  <div class="answ-box-right">
                    <p class="answ-box-right-p">{{ props.row.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          property="questionId"
          label="编号"
          width="60"
          align="center"
        />
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          property="type"
          label="题型"
          width="120"
          align="center"
        />
        <el-table-column property="description" label="题目">
          <template #default="scope">
            <div style="display: flex; flex-direction: column">
              <div>{{ getQues(scope.row.description) }}</div>
            </div>
          </template>
        </el-table-column>
        <!-- :class="getStatusClass(getExamStatus(item.startTime, item.examDuration))">{{ getExamStatus(item.startTime, item.examDuration) }} -->
        <el-table-column
          property="juniorState"
          label="审核状态"
          show-overflow-tooltip
          width="100"
          align="center"
        >
          <template #default="scope">
            <div>
              <span :class="getStatusClass(scope.row.juniorState)">{{
                scope.row.juniorState
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          property="createTime"
          label="创建时间"
          show-overflow-tooltip
          width="250"
          align="center"
        />
      </el-table>
      <div style="margin-top: 20px; display: flex; height: 40px">
        <el-button @click="toggleSelection()" size="large"
          >清空所有选择</el-button
        >
        <el-select
          v-model="selectBank"
          placeholder="请选择要添加的题库"
          size="large"
          class="selectbox"
          style="margin: 0px 15px"
        >
          <el-option
            :label="item.bankName"
            :value="item.bankId"
            :id="item.bankId"
            v-for="item in bankData"
            class="selectbox-option"
          />
        </el-select>
        <el-button
          @click="openToAddBank"
          type="primary"
          color="#626aef"
          style="color: aliceblue"
          size="large"
          >添加到题库</el-button
        >
      </div>
    </div>
    <!-- 分页器 -->
    <!-- <div class="page">
      <el-pagination layout="prev, pager, next" :total="1000" background />
    </div> -->
    <!-- <router-view></router-view> -->
    <el-dialog v-model="dialogFormVisible" title="新增题目">
      <el-form :model="dialogForm" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="题目类型"
          :label-width="formLabelWidth"
          prop="qtype"
        >
          <el-select
            v-model="dialogForm.qtype"
            placeholder="请选择要添加的题目类型"
          >
            <el-option label="主观题" value="1" />
            <el-option label="单选题" value="2" />
            <el-option label="多选题" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="题目分值"
          :label-width="formLabelWidth"
          prop="questionscore"
        >
          <el-input
            v-model="dialogForm.questionscore"
            autocomplete="off"
            :autosize="{ minRows: 3, maxRows: 3 }"
          ></el-input>
        </el-form-item>
        <!-- 主观题 -->
        <el-form-item
          label="题目内容"
          :label-width="formLabelWidth"
          v-if="dialogForm.qtype == '1'"
          prop="subjective.sdescribe"
        >
          <el-input
            v-model="dialogForm.subjective.sdescribe"
            autocomplete="off"
            :autosize="{ minRows: 7, maxRows: 7 }"
            type="textarea"
            placeholder="请输入题目内容"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="题目答案"
          :label-width="formLabelWidth"
          v-if="dialogForm.qtype == '1'"
          prop="subjective.sanswer"
        >
          <el-input
            v-model="dialogForm.subjective.sanswer"
            autocomplete="off"
            type="textarea"
            placeholder="请输入题目答案"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 7, maxRows: 7 }"
          />
        </el-form-item>
        <!-- 单选题 -->
        <el-form-item
          label="题目描述"
          :label-width="formLabelWidth"
          v-if="dialogForm.qtype == '2'"
          prop="radio.rdescribe"
        >
          <el-input
            v-model="dialogForm.radio.rdescribe"
            autocomplete="off"
            :autosize="{ minRows: 3, maxRows: 3 }"
            type="textarea"
            placeholder="请输入题目内容"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label=" 选项A "
          class="choose"
          v-if="dialogForm.qtype == '2'"
          prop="radio.rchoose.A"
        >
          <el-input v-model="dialogForm.radio.rchoose.A" />
        </el-form-item>
        <el-form-item
          label=" 选项B "
          class="choose"
          v-if="dialogForm.qtype == '2'"
          prop="radio.rchoose.B"
        >
          <el-input v-model="dialogForm.radio.rchoose.B" />
        </el-form-item>
        <el-form-item
          label=" 选项C "
          class="choose"
          v-if="dialogForm.qtype == '2'"
          prop="radio.rchoose.C"
        >
          <el-input v-model="dialogForm.radio.rchoose.C" />
        </el-form-item>
        <el-form-item
          label=" 选项D "
          class="choose"
          v-if="dialogForm.qtype == '2'"
          prop="radio.rchoose.D"
        >
          <el-input v-model="dialogForm.radio.rchoose.D" />
        </el-form-item>
        <el-form-item
          label="单选答案"
          v-if="dialogForm.qtype == '2'"
          class="single"
          prop="radio.ranswer"
        >
          <el-radio-group v-model="dialogForm.radio.ranswer">
            <el-radio label="A" />
            <el-radio label="B" />
            <el-radio label="C" />
            <el-radio label="D" />
          </el-radio-group>
        </el-form-item>
        <!-- 多选题 -->
        <el-form-item
          label="题目描述"
          :label-width="formLabelWidth"
          v-if="dialogForm.qtype == '3'"
          prop="multiple.mdescribe"
        >
          <el-input
            v-model="dialogForm.multiple.mdescribe"
            autocomplete="off"
            :autosize="{ minRows: 3, maxRows: 3 }"
            type="textarea"
            placeholder="请输入题目内容"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label=" 选项A "
          class="choose"
          v-if="dialogForm.qtype == '3'"
          prop="multiple.mchoose.A"
        >
          <el-input v-model="dialogForm.multiple.mchoose.A" />
        </el-form-item>
        <el-form-item
          label=" 选项B "
          class="choose"
          v-if="dialogForm.qtype == '3'"
          prop="multiple.mchoose.B"
        >
          <el-input v-model="dialogForm.multiple.mchoose.B" />
        </el-form-item>
        <el-form-item
          label=" 选项C "
          class="choose"
          v-if="dialogForm.qtype == '3'"
          prop="multiple.mchoose.C"
        >
          <el-input v-model="dialogForm.multiple.mchoose.C" />
        </el-form-item>
        <el-form-item
          label=" 选项D "
          class="choose"
          v-if="dialogForm.qtype == '3'"
          prop="multiple.mchoose.D"
        >
          <el-input v-model="dialogForm.multiple.mchoose.D" />
        </el-form-item>
        <el-form-item
          label="多选答案"
          v-if="dialogForm.qtype == '3'"
          class="single"
          prop="multiple.manswer"
        >
          <el-checkbox-group v-model="dialogForm.multiple.manswer">
            <el-checkbox label="A" name="type" />
            <el-checkbox label="B" name="type" />
            <el-checkbox label="C" name="type" />
            <el-checkbox label="D" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <!-- @click="dialogFormVisible = false" -->
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button type="primary" @click="addQnes(ruleFormRef)">
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.status-gray {
  color: gray;
  font-weight: 700;
}

.status-red {
  color: #fe4f4f;
  font-weight: 700;
}

.status-orange {
  color: #35d75ee7;
  font-weight: 700;
}
</style>
