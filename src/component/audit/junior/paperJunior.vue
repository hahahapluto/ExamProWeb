<template>
  <!-- 筛选试卷信息 -->
  <div class="selector">
    <el-form :model="selectForm" class="selector-form" size="large">
      <el-form-item class="selector-form-item">
        <el-input v-model="selectForm.data" class="selector-form-item-input" placeholder="搜索试卷内容" />
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
      <el-table-column property="paperId" label="试卷id" width="200" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.paperId }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="paperName" label="试卷名称">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.paperName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="paperName" label="试卷总分" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center; line-height: 50px">
            <!-- <el-icon><timer /></el-icon> -->
            <span>{{ scope.row.totalScore }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="330" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <el-button @click="handleEdit(scope.row, $router)">查看</el-button>
            <span v-if="scope.row.juniorState == 1" style="color: #67c23a; font-weight: 700; font-size: 16px; margin-left: 20px">已通过</span>
            <span v-if="scope.row.juniorState == 2" style="color: #f56c6c; font-weight: 700; font-size: 16px; margin-left: 20px">已拒绝</span>
            <el-button type="success" @click="passQues(scope.row)" v-if="scope.row.juniorState == 0">通过</el-button>
            <el-button type="danger" @click="refuseQues(scope.row)" v-if="scope.row.juniorState == 0">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { setPaperJuniorPass, setPaperJuniorRefuse } from '../../../request/api/audit/audit';
import { getPaper } from '../../../request/api/paper/paper';

interface paperInfo {
  paperId: string
  paperName: string
  objectiveScore: string
  subjectiveScore: Number
  totalScore: string
}

const selectForm = reactive({
  data: '',
  type: '请选择试卷状态'
})

// 所有试卷的信息
const allPaperInfo = ref<paperInfo[]>([])

// 获取考试列表
const getPaperList = async () => {
  try {
    let res = await getPaper()
    allPaperInfo.value = res.data.data
    console.log(allPaperInfo.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getPaperList()
})

// 跳转
const handleEdit = (row: paperInfo, $router: any) => {
  console.log(row)
  $router.push('/index/enterExam')
}

// 通过
const passQues = async (scope: any) => {
  console.log(scope.paperId)
  const { code, msg } = (await setPaperJuniorPass(scope.paperId)).data
  if (code == 0) ElMessage.success(msg)
  getPaperList()
}
// 拒绝
const refuseQues = async (scope: any) => {
  console.log(scope.paperId)
  const { code, msg } = (await setPaperJuniorRefuse(scope.paperId)).data
  if (code == 0) ElMessage.success(msg)
  getPaperList()
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
