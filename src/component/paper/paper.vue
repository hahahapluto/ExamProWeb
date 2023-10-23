<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { getPaper, addPaper } from "../../request/api/paper/paper";
import "../../sass/paper/paper.scss";
import { reactive, ref, computed, onMounted, watchEffect } from "vue";
import pinia from "../../stores";
import paperStore from "../../stores/paperStore";

const paperData = paperStore(pinia);

interface paperInfo {
  paperId: number;
  paperName: string;
  objectiveScore: string;
  subjectiveScore: Number;
  totalScore: string;
}

// 所有试卷的信息
const allPaperInfo = ref<paperInfo[]>([]);

const state = reactive({
  search: "",
  tableData: allPaperInfo.value,
});

const clearSearch = () => {
  if (state.search.length == 0) {
    // 当 form.data 为空时，赋值为 allTableDate
    state.tableData = allPaperInfo.value;
  }
};

// 定义模糊查询的 computed 属性
const filteredData = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = state.search.toLowerCase(); // 将查询字符串转换为小写
  return state.tableData.filter((item) => {
    // 根据题目内容和题目类型进行模糊查询
    return item.paperName.toLowerCase().includes(searchData);
  });
});

// 搜索
const onSearch = () => {
  if (state.search.length > 0) {
    // 进行模糊查询并赋值给 tableData
    state.tableData = filteredData.value;
  } else {
    // 当 form.data 为空时，赋值为 allTableDate
    state.tableData = allPaperInfo.value;
  }
};

const handleReg = ($router: any, _index: any, row: paperInfo) => {
  paperData.paperId = row.paperId;
  paperData.paperName = row.paperName;
  $router.push("/index/detailPaper");
};

// 获取考试列表
const getPaperList = async () => {
  try {
    let res = await getPaper();
    allPaperInfo.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getPaperList();
});

// 在数据变化时重新渲染视图
watchEffect(() => {
  state.tableData = allPaperInfo.value;
});

// 添加题库
let dialogFormVisible = ref(false);
// 添加题库弹窗的表格
interface ruleForm {
  inputName: string;
}
const dialoForm = reactive<ruleForm>({
  inputName: "",
});
// 获取添加题库表单的ref
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<ruleForm>>({
  inputName: [{ required: true, message: "请填写试卷名字", trigger: "blur" }],
});

const resetForm = (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};

const addNewPaper = async ($router: any, formEl: FormInstance | undefined) => {
  dialogFormVisible.value = false;
  if (!formEl) return;
  // 首先调用表单验证
  formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");
      // 发送添加试卷
      const res = await addPaper(dialoForm.inputName);
      console.log(res);
      // 重新获取试卷信息
      getPaperList();
      paperData.paperName = dialoForm.inputName;
      paperData.paperId = res.data.data.paperId;
      console.log(paperData.paperId);
      ElMessage.success(res.data.msg);
      $router.push("/index/detailPaper");
    } else {
      console.log("error submit!", fields);
      ElMessage.warning("添加考试失败！");
      return;
    }
  });
};

watchEffect(() => {});
</script>
<template>
  <!-- <createPaper /> -->
  <div class="paper">
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
      <el-form-item>
        <el-button class="add" type="primary" @click="dialogFormVisible = true"
          >添加</el-button
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
        prop="paperId"
        label="试卷ID"
        align="center"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="paperName"
        label="试卷名称"
        align="center"
        width="350px"
      >
      </el-table-column>
      <el-table-column prop="objectiveScore" label="客观题分数" align="center">
      </el-table-column>
      <el-table-column prop="subjectiveScore" label="主观题分数" align="center">
      </el-table-column>
      <el-table-column prop="totalScore" label="总分" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template #default="scope">
          <el-button
            class="search"
            type="primary"
            @click="handleReg($router, scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogFormVisible"
      title="新增试卷"
      style="width: 500px"
    >
      <el-form
        :model="dialoForm"
        label-position="left"
        ref="ruleFormRef"
        :rules="rules"
      >
        <el-form-item label="试卷名称" label-width="80px" prop="inputName">
          <el-input v-model="dialoForm.inputName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)" color="#626aef"
            >重置</el-button
          >
          <el-button
            color="#626aef"
            type="primary"
            @click="addNewPaper($router, ruleFormRef)"
          >
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
