<template>
  <!-- 筛选试卷信息 -->
  <div class="selector">
    <el-form :model="selectForm" class="selector-form" size="large">
      <el-form-item class="selector-form-item">
        <el-input v-model="selectForm.data" class="selector-form-item-input" placeholder="搜索考试内容" />
      </el-form-item>
      <el-form-item class="selector-form-item">
        <el-select v-model="selectForm.type" placeholder="please select your zone" class="selector-form-item-select">
          <el-option label="全部" value="0" />
          <el-option label="未审核" value="1" />
          <el-option label="已通过" value="2" />
          <el-option label="未通过" value="3" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <div class="showTable">
    <el-table :data="allPaperInfo" style="width: 100%">
      <el-table-column property="examID" label="试卷id" width="150" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.examID }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="examName" label="试卷名称" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.examName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="startTime" label="考试开始时间" width="300" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.startTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="examDuration" label="考试时长" width="100" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.examDuration }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="numberOfExaminees" label="考试人数" width="150" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <span>{{ scope.row.numberOfExaminees }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="330" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <el-button @click="handleEdit(scope.row, $router)">查看</el-button>
            <span v-if="scope.row.ultimateState == 1" style="color: #67c23a; font-weight: 700; font-size: 16px; margin-left: 20px">已通过</span>
            <span v-if="scope.row.ultimateState == 2" style="color: #f56c6c; font-weight: 700; font-size: 16px; margin-left: 20px">已拒绝</span>
            <el-button type="success" @click="passQues(scope.row)" v-if="scope.row.ultimateState == 0">通过</el-button>
            <el-button type="danger" @click="refuseQues(scope.row)" v-if="scope.row.ultimateState == 0">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { setExamUltimatePass, setExamUltimateRefuse } from '../../../request/api/audit/audit';
import { getExamPassJunior } from '../../../request/api/paper/exam';

interface examInterface {
  examID: Number
  examName: string
  startTime: string
  examDuration: Number
  numberOfExaminees: Number
  juniorState: Number
  ultimateState:Number
}

const selectForm = reactive({
  data: '',
  type: '请选择考试状态'
})

// 所有试卷的信息
const allPaperInfo = ref<examInterface[]>([])

// 获取考试列表
const getExamList = async () => {
  try {
    let res = await getExamPassJunior()
    allPaperInfo.value = res.data.data
    allPaperInfo.value.forEach((item: examInterface) => {
      let date = new Date(item.startTime)
      item.startTime = date.toLocaleString()
    })
    console.log(allPaperInfo.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getExamList()
})

// 跳转
const handleEdit = (row: examInterface, $router: any) => {
  console.log(row)
  $router.push('/index/paper')
}

// 通过
const passQues = async (scope: any) => {
  console.log(scope.examID)
  const { code, msg } = (await setExamUltimatePass(scope.examID)).data
  if (code == 0) ElMessage.success(msg)
  getExamList()
}
// 拒绝
const refuseQues = async (scope: any) => {
  console.log(scope.examID)
  const { code, msg } = (await setExamUltimateRefuse(scope.examID)).data
  if (code == 0) ElMessage.success(msg)
  getExamList()
}
</script>

<style lang="scss" scoped>
.selector {
  // background-color: #afadad;
  display: flex;
  height: 40px;
  &-form {
    display: flex;
    align-items: center;
    &-item {
      margin-bottom: 0px;
      margin-right: 30px;
    }
  }
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.showTable {
  margin-top: 10px;
}
</style>
