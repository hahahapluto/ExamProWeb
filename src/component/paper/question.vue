<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { ElTable, ElMessage, ElMessageBox } from 'element-plus'
import '../../sass/index/paper/question.scss'
import { getAllQuestion } from '../../request/api/paper/question'
import cloneDeep from 'lodash/cloneDeep';
interface Ques {
  type: string
  data: string
  createTime: string
}
// 上面筛选的两个表格的信息 data:搜索内容 type:题目类型
const form = reactive({
  data: '',
  type: '请选择题目类型'
})
const queryInfo = reactive({
  query: '', // 查询参数
  pagenum: 1, // 当前页码
  pagesize: 2 // 每页显示条数
})
const jumpPath = function ($router, path) {
  $router.push('/index/' + path)
}

// 获取对应页码的题目 初始化
const getQuesList = async function getQuesList() {
  const { data: res } = await getAllQuestion(queryInfo.pagenum, queryInfo.pagesize)
  return res
}

// const allTableDate=getQuesList();
const allTableDate = ref<Ques[]>([
  { type: '选择题', data: '题目信息', createTime: '创建时间' },
  { type: '11题', data: '2信息', createTime: '创建时间' }
])
// 深拷贝，初始的表格数据时全部的个人数据
let tableData = ref<Ques[]>(cloneDeep(allTableDate.value));

// 表格的试题信息
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
// 题的类型？
const multipleSelection = ref<Ques[]>([])

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
const handleSelectionChange = (val: Ques[]) => {
  console.log(val)
  multipleSelection.value = val
}

// 将选择的试题添加到题库
let openToAddBank = function () {}

// 根据form.data搜索对应的题目
const searchQues = function searchQues() {
  console.log(form.data)
  if (form.data.length > 0) {
    // 进行模糊查询并赋值给 tableData
    tableData.value = filteredData.value
  } else {
    // 当 form.data 为空时，赋值为 allTableDate
    tableData.value = allTableDate.value
  }
}

// 定义模糊查询的 computed 属性
const filteredData = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.data.toLowerCase() // 将查询字符串转换为小写
  return tableData.value.filter(item => {
    // 根据题目内容和题目类型进行模糊查询
    return item.data.toLowerCase().includes(searchData)
  })
})
</script>

<template>
  <div>
    <!-- 筛选试题信息 -->
    <div class="selector">
      <el-form :model="form" class="selector-form" size="large">
        <el-form-item class="selector-form-item">
          <el-input v-model="form.data" class="selector-form-item-input" placeholder="搜索题目内容" @input="searchQues" />
        </el-form-item>
        <el-form-item class="selector-form-item">
          <el-select v-model="form.type" placeholder="please select your zone" class="selector-form-item-select">
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
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border class="from-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="题目类型" width="120" property="type" />
        <el-table-column property="data" label="题目内容(点击可查看详细信息)" />
        <el-table-column property="createTime" label="创建时间" show-overflow-tooltip width="250" />
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
      <el-pagination layout="prev, pager, next" :total="1000" background />
    </div>
    <!-- 弹窗 -->
  </div>
</template>
