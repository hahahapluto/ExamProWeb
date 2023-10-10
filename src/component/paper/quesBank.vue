<script setup lang="ts">
// import type { FormInstance } from 'element-plus';
import { FormInstance, FormRules } from 'element-plus';
import cloneDeep from 'lodash/cloneDeep';
import { reactive, ref } from 'vue';
import { addBank, getMyBank } from '../../request/api/paper/bank';
import pinia from '../../stores';
import quesStore from '../../stores/quesStore';
// import { commonRules } from '../../utils/question'

let isDark = true

interface bank {
  bankId: number
  bankName: string
  createTime: Date
}
// 引入问题pinia
const quesData = quesStore(pinia);

const selectForm = reactive({
  bankName: ''
})
// 根据form.data搜索对应的题目
const searchBankByInput = function searchBankByInput() {
  console.log(selectForm.bankName)
  // console.log(filteredData.value)
  // if (form.data.length > 0) {
  //   // 进行模糊查询并赋值给 tableData
  //   tableData.value = filteredData.value
  // } else {
  //   // 当 form.data 为空时，赋值为 aqllTableDate
  //   tableData.value = allTableData
  // }
}

// let allTableDate: any = myQuestionList.value;
let allTableData: any = ref<bank[]>()
// 深拷贝，初始的表格数据时全部的个人数据
let tableData: any = ref<bank[]>()

// tableData = myQuestionList;
const AllQuestion = async () => {
  allTableData = (await getMyBank()).data.data
  console.log(allTableData)
  allTableData.forEach((item: { createTime: string }) => {
    let date = new Date(item.createTime)
    item.createTime = date.toLocaleString()
  })
  tableData.value = cloneDeep(allTableData)
}
AllQuestion()
const multipleSelection = ref<bank[]>([])

// handleSelectionChange：选中了几个题目并存放在value中
const handleSelectionChange = (val: bank[]) => {
  console.log('handleSelectionChange', val)
  multipleSelection.value = val
}

const handleEdit = (row: bank, $router: any) => {
  // 跳转题库中题目信息
  quesData.bankId = row.bankId;
  quesData.bankName = row.bankName;
  $router.push("/index/quesBank/add");
}
const handleDelete = (index: number, row: bank) => {
  console.log(index, row)
}
// const dialogTableVisible = ref(false)
let dialogFormVisible = ref(false)
// 添加题库弹窗的表格
const dialoForm = reactive({
  inputName: ''
})
// 添加题库
const addMyBank = async (formEl: FormInstance | undefined) => {
  // addBank
  dialogFormVisible.value = false
  console.log(dialoForm)
  if (!formEl) return
  // 首先调用表单验证
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const res = await addBank(dialoForm.inputName)
      console.log(res)
      AllQuestion()
    } else {
      console.log('error submit!', fields)
      return
    }
  })
}

interface ruleForm {
  inputName: string
}
// 获取添加题库表单的ref
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<ruleForm>>({
  inputName: [{ required: true, message: '请填写题库名字', trigger: 'blur' }]
})

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // formEl.resetFields()
}
</script>
<template>
  <div>
    <!-- 筛选题库信息 -->
    <div class="selector">
      <el-form :model="selectForm" class="selector-form" size="large">
        <el-form-item class="selector-form-item">
          <el-input v-model="selectForm.bankName" class="selector-form-item-input" placeholder="搜索题库内容" @input="searchBankByInput" />
        </el-form-item>
        <el-row class="mb-4">
          <el-button type="primary" color="#626aef" icon="plus" :dark="isDark" @click="dialogFormVisible = true"> 新增题库 </el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 题库列表 -->
    <div class="form">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border class="from-table">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column property="bankId" label="题库编号" width="200" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <!-- <el-icon><timer /></el-icon> -->
              <span>{{ scope.row.bankId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="bankName" label="题库名称" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <!-- <el-icon><timer /></el-icon> -->
              <span>{{ scope.row.bankName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="createTime" label="创建时间" show-overflow-tooltip width="300" align="center" />
        <el-table-column label="Operations" width="330" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row,$router)">Details</el-button>
            <el-button @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">点击第二个和第三个</el-button> -->
        <!-- <el-button @click="toggleSelection()">清空所有选择</el-button> -->
        <!-- <el-row class="mb-4"> -->
        <!-- <el-button @click="openToAddBank" type="primary" color="#283ee3">添加到题库 </el-button> -->
        <!-- </el-row> -->
      </div>
    </div>
    <!-- 添加题库 -->
    <el-dialog v-model="dialogFormVisible" title="新增题库" style="width: 500px">
      <el-form :model="dialoForm" label-position="left" ref="ruleFormRef" :rules="rules">
        <el-form-item label="题库名称" label-width="80px" prop="inputName">
          <el-input v-model="dialoForm.inputName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button color="#626aef" type="primary" @click="addMyBank(ruleFormRef)"> 添加 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.selector {
  &-form {
    display: flex;
    font-size: 20px;
    &-item {
      width: 300px;
      margin-right: 30px;
    }
  }
}
</style>

function cloneDeep(allTableData: any): any { throw new Error('Function not implemented.'); }
