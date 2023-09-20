<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElTable, ElMessage, ElMessageBox } from 'element-plus'
import '../../sass/index/paper/question.scss'
let form = reactive({
  type: '搜索题目内容',
  region: '请选择题目类型'
})
const jumpPath = function ($router, path) {
  $router.push('/index/' + path)
}
interface User {
  date: string
  name: string
  address: string
}

// 表格的试题信息
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
// 题的类型？
const multipleSelection = ref<User[]>([])
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
  multipleTableRef.value!.clearSelection()
  // }
}
const handleSelectionChange = (val: User[]) => {
  console.log(val);
  
  multipleSelection.value = val
}
// 数据
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

// 将选择的试题添加到题库
let openToAddBank = function () {}
</script>

<template>
  <div>
    <!-- 筛选试题信息 -->
    <div class="selector">
      <el-form :model="form" class="selector-form" size="large">
        <el-form-item class="selector-form-item">
          <el-input v-model="form.type" class="selector-form-item-input" />
        </el-form-item>
        <el-form-item class="selector-form-item">
          <el-select v-model="form.region" placeholder="please select your zone" class="selector-form-item-select">
            <el-option label="选择题" value="choose" />
            <el-option label="简答题" value="shortAnswer" />
          </el-select>
        </el-form-item>
        <el-row class="mb-4">
          <el-button type="primary" color="#626aef" icon="plus"> 新增题目 </el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 试题信息 -->
    <div class="form">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border="true" class="from-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="题目类型" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="题目内容(点击可查看详细信息)" />
        <el-table-column property="address" label="创建时间" show-overflow-tooltip width="250" />
      </el-table>
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">点击第二个和第三个</el-button> -->
        <el-button @click="toggleSelection()">清空所有选择</el-button>
        <!-- <el-row class="mb-4"> -->
        <el-button @click="openToAddBank" type="primary" color="#626aef">添加到题库 </el-button>
        <!-- </el-row> -->
      </div>
    </div>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="1000" background="#626aef" />
    </div>
    <!-- 弹窗 -->
  </div>
</template>
