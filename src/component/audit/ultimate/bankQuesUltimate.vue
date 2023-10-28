<script setup lang="ts">
// import type { FormInstance } from 'element-plus';
import cloneDeep from 'lodash/cloneDeep';
import { reactive, ref } from 'vue';
import { getAllBank } from '../../../request/api/paper/bank';
import pinia from '../../../stores';
import quesBankPinia from '../../../stores/aduitQuesBank';
// import { commonRules } from '../../utils/question'

let isDark = true

interface bank {
  bankId: number
  bankName: string
  createTime: Date
}
// 引入问题pinia
const aduitQuesBank = quesBankPinia(pinia);

const selectForm = reactive({
  bankName: ''
})
// 根据form.data搜索对应的题目
const searchBankByInput = function searchBankByInput() {
  console.log(selectForm.bankName)
}

// let allTableDate: any = myQuestionList.value;
let allTableData: any = ref<bank[]>()
// 深拷贝，初始的表格数据时全部的个人数据
let tableData: any = ref<bank[]>()

// tableData = myQuestionList;
const AllQuestion = async () => {
  allTableData = (await getAllBank()).data.data
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
  aduitQuesBank.auditBankId = row.bankId;
  aduitQuesBank.auditBankName = row.bankName;
  $router.push("/index/aduit/ultimate/auditQues");
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
          <el-button type="primary" color="#626aef" :dark="isDark"> 查询 </el-button>
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
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row,$router)" type="success" plain>审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
      </div>
    </div>
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