<script lang="ts" setup>
import { ElMessage, ElTable } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { computed, reactive, ref } from 'vue'
import { setQuesJuniorPass, setQuesJuniorRefuse } from '../../../request/api/audit/audit'
import { getMyBank } from '../../../request/api/paper/bank'
import { getAllQues } from '../../../request/api/paper/question'
import '../../../sass/index/paper/addQues.scss'
import '../../../sass/index/paper/question.scss'
import { formatExamString, getOption, getQues } from '../../../utils/question'
interface Ques {
  questionType: string
  questionDescription: string
  createTime: string
  questionId: Number
  questionAnswer: string
  questionscore: string
  juniorState:Number
}
// 上面筛选的两个表格的信息 data:搜索内容 type:题目类型
const form = reactive({
  data: '',
  type: '请选择题目类型'
})
// setQuesJuniorPass(3);
// let allTableDate: any = myQuestionList.value;
let allTableData: any = ref<Ques[]>()
// 深拷贝，初始的表格数据时全部的个人数据
let tableData: any = ref<Ques[]>()

// tableData = myQuestionList;
const AllQuestion = async () => {
  allTableData = (await getAllQues()).data.data
  console.log(allTableData)
  allTableData.forEach((item: { questionType: string; questionDescription: string; createTime: string }) => {
    let date = new Date(item.createTime)
    item.createTime = date.toLocaleString()
    if (item.questionType == '0') {
      item.questionType = '主观题'
    } else if (item.questionType == '1') {
      console.log(item.questionDescription)
      item.questionType = '单选题'
      item.questionDescription = formatExamString(item.questionDescription)
    } else {
      console.log(item)
      console.log(item.questionDescription)
      item.questionType = '多选题'
      item.questionDescription = formatExamString(item.questionDescription)
    }
  })
  console.log(allTableData)
  tableData.value = cloneDeep(allTableData)
}
AllQuestion()

// 表格的试题信息
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
// 题的类型？
const multipleSelection = ref<Ques[]>([])

// // 可以用于选择固定的第几位 修改成clear all
// const toggleSelection = () => {
//   multipleTableRef.value!.clearSelection()
// }

// handleSelectionChange：选中了几个题目并存放在value中
const handleSelectionChange = (val: Ques[]) => {
  // console.log('handleSelectionChange', val)
  multipleSelection.value = val
}

// 根据form.data搜索对应的题目
const searchQuesByInput = function searchQuesByInput() {
  console.log(form.data)
  console.log(filteredData.value)
  if (form.data.length > 0) {
    // 进行模糊查询并赋值给 tableData
    tableData.value = filteredData.value
  } else {
    // 当 form.data 为空时，赋值为 aqllTableDate
    tableData.value = allTableData
  }
}

// 根据from.type搜索对应的题目
const searchQuesBySelect = function searchQuesBySelect() {
  if (form.type !== '0') {
    tableData.value = filteredType.value
  } else {
    tableData.value = allTableData
  }
}

// 定义模糊查询的 computed 属性
const filteredData = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.data.toLowerCase() // 将查询字符串转换为小写
  return tableData.value.filter((item: Ques) => {
    // 根据题目内容和题目类型进行模糊查询
    return item.questionDescription.toLowerCase().includes(searchData)
  })
})

// 根据对应的type显示对应的题目内容
const filteredType = computed(() => {
  // 使用 form.data 进行模糊查询
  const searchData = form.type // 将查询字符串转换为小写
  return allTableData.filter((item: any) => {
    if (searchData == '1') {
      return item.questionType == '主观题'
    } else if (searchData == '2') {
      return item.questionType == '单选题'
    } else if (searchData == '3') {
      return item.questionType == '多选题'
    } else {
      return ''
    }
  })
})

// 定义表单不能为空的验证规则


interface bankInterface {
  bankId: Number
  bankName: string
}
let bankData: any = ref<bankInterface[]>()

// 获取题库信息
const getBankData = async () => {
  bankData.value = (await getMyBank()).data.data
  console.log(bankData)
}
getBankData()
// 通过
const passQues =async(scope:any)=>{
  console.log(scope.questionId);
  const { code, msg } =(await setQuesJuniorPass(scope.questionId)).data;
  if(code == 0)
    ElMessage.success(msg);
  AllQuestion();
}
// 拒绝
const refuseQues =async(scope:any)=>{
  console.log(scope.questionId);
  const { code, msg } =(await setQuesJuniorRefuse(scope.questionId)).data;
  if(code == 0)
    ElMessage.success(msg);
  AllQuestion();
}
</script>

<template>
  <div>
    <!-- 筛选试题信息 -->
    <div class="selector">
      <el-form :model="form" class="selector-form" size="large">
        <el-form-item class="selector-form-item">
          <el-input v-model="form.data" class="selector-form-item-input" placeholder="搜索题目内容" @input="searchQuesByInput" />
        </el-form-item>
        <el-form-item class="selector-form-item">
          <el-select v-model="form.type" placeholder="please select your zone" class="selector-form-item-select" @change="searchQuesBySelect">
            <el-option label="全部" value="0" />
            <el-option label="主观题" value="1" />
            <el-option label="单选题" value="2" />
            <el-option label="多选题" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 试题信息 -->
    <div class="form">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%; height:700px" @selection-change="handleSelectionChange" class="from-table" :row-style="{ height: '50px' }" border>
        <el-table-column type="expand" width="50" align="center">
          <template #default="props">
            <div style="display: flex; padding: 10px">
              <div class="des">
                <div class="des-left">题干</div>
                <div class="des-right">
                  <p class="des-right-pp">{{ getQues(props.row.questionDescription) }}</p>
                  <p v-if="props.row.questionType !== '主观题'" class="des-right-p">A、 {{ getOption('A=', props.row.questionDescription) }}</p>
                  <p v-if="props.row.questionType !== '主观题'" class="des-right-p">B、 {{ getOption('B=', props.row.questionDescription) }}</p>
                  <p v-if="props.row.questionType !== '主观题'" class="des-right-p">C、 {{ getOption('C=', props.row.questionDescription) }}</p>
                  <p v-if="props.row.questionType !== '主观题'" class="des-right-p">D、 {{ getOption('D=', props.row.questionDescription) }}</p>
                </div>
              </div>
              <div class="answ">
                <div class="answ-box score">
                  <div class="answ-box-left">分值</div>
                  <p class="answ-box-right-p">{{ props.row.questionScore }}</p>
                </div>
                <div class="answ-box">
                  <div class="answ-box-left">答案</div>
                  <div class="answ-box-right">
                    <p class="answ-box-right-p">{{ props.row.questionAnswer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="questionId" label="编号" width="60" align="center" />
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column property="questionType" label="题型" width="120" align="center" />
        <el-table-column property="questionDescription" label="题目">
          <template #default="scope">
            <div style="display: flex; flex-direction: column">
              <div>{{ getQues(scope.row.questionDescription) }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="createTime" label="创建时间" show-overflow-tooltip width="250" align="center" />
        <el-table-column label="操作" width="230" align="center">
          <template #default="scope">
            <el-button type="success" @click="passQues(scope.row);" v-if="scope.row.juniorState == 0">通过</el-button>
            <el-button type="danger" @click="refuseQues(scope.row)" v-if="scope.row.juniorState == 0">拒绝</el-button>
            <span v-if="scope.row.juniorState == 1" style="color: #67c23a; font-weight: 700; font-size: 16px;">已通过</span>
            <span v-if="scope.row.juniorState == 2" style="color: #f56c6c; font-weight: 700; font-size: 16px;">已拒绝</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <!-- <div class="page">
      <el-pagination layout="prev, pager, next" :total="1000" background />
    </div> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
<style scoped lang="scss"></style>
