<script lang="ts" setup>
import { ElTable } from "element-plus";
import { computed, reactive, ref } from "vue";
import "../../sass/index/paper/addQues.scss";
import "../../sass/index/paper/question.scss";
// import { getAllQuestion } from "../../request/api/paper/question";
import cloneDeep from "lodash/cloneDeep";

interface Ques {
  type: string;
  data: string;
  createTime: string;
}
// 上面筛选的两个表格的信息 data:搜索内容 type:题目类型
const form = reactive({
  data: "",
  type: "请选择题目类型",
});
// 获取表格信息的查询参数
// const queryInfo = reactive({
//   query: "", // 查询参数
//   pagenum: 1, // 当前页码
//   pagesize: 2, // 每页显示条数
// });

// 获取对应页码的题目 初始化
// const getQuesList = async function getQuesList() {
//   const { data: res } = await getAllQuestion(
//     queryInfo.pagenum,
//     queryInfo.pagesize
//   );
//   return res;
// };

// const allTableDate=getQuesList();
const allTableDate = ref<Ques[]>([
  { type: "单选题", data: "题目5464信息", createTime: "创建时间" },
  { type: "主观题", data: "2信息", createTime: "创建时间" },
  { type: "多选题", data: "567息", createTime: "创建时间" },
  { type: "主观题", data: "546息", createTime: "创建时间" },
  { type: "多选题", data: "2信654息", createTime: "创建时间" },
]);
// 深拷贝，初始的表格数据时全部的个人数据
let tableData = ref<Ques[]>(cloneDeep(allTableDate.value));

// 表格的试题信息
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
// 题的类型？
const multipleSelection = ref<Ques[]>([]);

/**
 * 可以用于选择固定的第几位 修改成clear all
 */
const toggleSelection = () => {
  // if (rows) {  参数：rows?: User[]
  //   rows.forEach((row) => {
  //     // TODO: improvement typing when refactor table
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     multipleTableRef.value!.toggleRowSelection(row, undefined)
  //   })
  // } else {
  multipleTableRef.value!.clearSelection();
  // }
};
const handleSelectionChange = (val: Ques[]) => {
  console.log(val);
  multipleSelection.value = val;
};

// 将选择的试题添加到题库
let openToAddBank = function () {};

// 根据form.data搜索对应的题目
const searchQuesByInput = function searchQuesByInput() {
  console.log(form.data);
  if (form.data.length > 0) {
    // 进行模糊查询并赋值给 tableData
    tableData.value = filteredData.value;
  } else {
    // 当 form.data 为空时，赋值为 allTableDate
    tableData.value = allTableDate.value;
  }
};

// 根据from.type搜索对应的题目
const searchQuesBySelect = function searchQuesBySelect() {
  console.log(form.type);
  if (form.type !== "0") {
    tableData.value = filteredType.value;
  } else {
    tableData.value = allTableDate.value;
  }
};

// 定义模糊查询的 computed 属性
const filteredData = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.data.toLowerCase(); // 将查询字符串转换为小写
  return tableData.value.filter((item) => {
    // 根据题目内容和题目类型进行模糊查询
    return item.data.toLowerCase().includes(searchData);
  });
});

// 根据对应的type显示对应的题目内容
const filteredType = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.type; // 将查询字符串转换为小写
  return allTableDate.value.filter((item) => {
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

//

let dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const dialogForm = reactive({
  name: "",
  qtype:"1", //类型
  describe: "", //题目描述
  answer: "", //单选答案
  canswer: [], //多选答案
  choose: {
    //选择题每一个选项
    A: "",
    B: "",
    C: "",
    D: "",
  },
});

const addQnes = function addQnes() {
  // 主观题 subjective
  let QuestionDescription, QuestionAnswer;
  if (dialogForm.qtype === "1") {
    QuestionDescription = dialogForm.describe;
    QuestionAnswer = dialogForm.answer;
  } else if (dialogForm.qtype === "2") {
    //单选
    QuestionDescription = `${dialogForm.describe}(exampro)A=${dialogForm.choose.A}&B=${dialogForm.choose.B}&C=${dialogForm.choose.C}&D=${dialogForm.choose.D}`;
    QuestionAnswer = dialogForm.answer;
  } else {
    QuestionDescription = `${dialogForm.describe}(exampro)A=${dialogForm.choose.A}&B=${dialogForm.choose.B}&C=${dialogForm.choose.C}&D=${dialogForm.choose.D}`;
  }
  const qusetionMessage = {
    // 题目类型
    QuestionType: dialogForm.qtype,
    // 题目描述
    QuestionDescription,
    // 题目答案
    QuestionAnswer,
  };
  console.log(qusetionMessage);
  dialogFormVisible.value = false;
};
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
            color="#283ee3"
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
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
        class="from-table"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="题目类型" width="120" property="type" />
        <el-table-column property="data" label="题目内容(点击可查看详细信息)" />
        <el-table-column
          property="createTime"
          label="创建时间"
          show-overflow-tooltip
          width="250"
        />
      </el-table>
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">点击第二个和第三个</el-button> -->
        <el-button @click="toggleSelection()">清空所有选择</el-button>
        <!-- <el-row class="mb-4"> -->
        <el-button @click="openToAddBank" type="primary" color="#283ee3"
          >添加到题库
        </el-button>
        <!-- </el-row> -->
      </div>
    </div>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="1000" background />
    </div>
    <!-- <router-view></router-view> -->
    <el-dialog v-model="dialogFormVisible" title="新增题目">
      <el-form :model="dialogForm">
        <el-form-item label="题目类型" :label-width="formLabelWidth">
          <el-select
            v-model="dialogForm.qtype"
            placeholder="请选择要添加的题目类型"
          >
            <el-option label="主观题" value="1" />
            <el-option label="单选题" value="2" />
            <el-option label="多选题" value="3" />
          </el-select>
        </el-form-item>
        <!-- 主观题 -->
        <el-form-item
          label="题目内容"
          :label-width="formLabelWidth"
          v-if="dialogForm.qtype == '1'"
        >
          <el-input
            v-model="dialogForm.describe"
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
        >
          <el-input
            v-model="dialogForm.answer"
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
          v-if="dialogForm.qtype == '2' || dialogForm.qtype == '3'"
        >
          <el-input
            v-model="dialogForm.describe"
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
          v-if="dialogForm.qtype == '2' || dialogForm.qtype == '3'"
        >
          <el-input v-model="dialogForm.choose.A" />
        </el-form-item>
        <el-form-item
          label=" 选项B "
          class="choose"
          v-if="dialogForm.qtype == '2' || dialogForm.qtype == '3'"
        >
          <el-input v-model="dialogForm.choose.B" />
        </el-form-item>
        <el-form-item
          label=" 选项C "
          class="choose"
          v-if="dialogForm.qtype == '2' || dialogForm.qtype == '3'"
        >
          <el-input v-model="dialogForm.choose.C" />
        </el-form-item>
        <el-form-item
          label=" 选项D "
          class="choose"
          v-if="dialogForm.qtype == '2' || dialogForm.qtype == '3'"
        >
          <el-input v-model="dialogForm.choose.D" />
        </el-form-item>
        <el-form-item
          label="单选答案"
          v-if="dialogForm.qtype == '2'"
          class="single"
        >
          <el-radio-group v-model="dialogForm.answer">
            <el-radio label="A" />
            <el-radio label="B" />
            <el-radio label="C" />
            <el-radio label="D" />
          </el-radio-group>
        </el-form-item>
        <!-- 多选题 -->
        <el-form-item
          label="多选答案"
          v-if="dialogForm.qtype == '3'"
          class="single"
        >
          <el-checkbox-group v-model="dialogForm.canswer">
            <el-checkbox label="A" name="type" />
            <el-checkbox label="B" name="type" />
            <el-checkbox label="C" name="type" />
            <el-checkbox label="D" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addQnes()"> 添加 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
