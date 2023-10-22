<template>
  <div>
    <div class="selectbox">
      <div class="selector">
        <div class="selector-left">
          <div class="selector-left-item" @click="chooseStates('全部')" :class="{ selected: selectedState === '全部' }">全部</div>
          <div class="selector-left-item" @click="chooseStates('未开始')" :class="{ selected: selectedState === '未开始' }">未开始</div>
          <div class="selector-left-item" @click="chooseStates('考试中')" :class="{ selected: selectedState === '考试中' }">已开始</div>
          <div class="selector-left-item" @click="chooseStates('已结束')" :class="{ selected: selectedState === '已结束' }">已过期</div>
        </div>
        <div class="selector-right">
          <div class="selector-right-input"></div>
          <div class="selector-right-button"></div>
        </div>
      </div>
      <div class="show">
        <el-input class="w-50 m-2 show-input" placeholder="请输入考试名称" />
        <el-button class="show-button" color="#626aef" style="color: aliceblue" size="large">搜索考试</el-button>
      </div>
    </div>
    <!-- 在线考试 -->
    <examItem :tableData="tableData"></examItem>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep';
import { ref } from "vue";
import { getMyExams } from '../../request/api/exam/examRegistration';
import examItem from '../paper/exam/examItem.vue';
let examData: any = ref({})
let tableData: any = ref({})
// let isGetData:boolean = false
const getExamData = async () => {
  // 获取个人的考试
  examData = (await getMyExams()).data.data
  tableData.value = cloneDeep(examData)
  console.log(tableData)
}

function getExamStatus(startTimeStr: string, durationMinutes: number) {
  // 将输入的开始时间字符串转换为日期对象
  const startTime = new Date(startTimeStr)
  // 获取当前时间
  const currentTime = new Date()
  // 计算结束时间
  const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000)
  if (currentTime < startTime) {
    // 考试未开始
    return '未开始'
  } else if (currentTime >= startTime && currentTime <= endTime) {
    // 考试进行中
    return '考试中'
  } else {
    // 考试已结束
    return '已结束'
  }
}

// 响应式变量，用于存储当前选择的状态，默认为"全部"
const selectedState = ref('全部')
getExamData()
const chooseStates = (state: string) => {
  selectedState.value = state
  if (state == '全部') {
    return (tableData.value = examData)
  }
  tableData.value = examData.filter((item: { startTime: string; examDuration: number }) => {
    return getExamStatus(item.startTime, item.examDuration) == state
  })
}
// tableData = {username:1};

// computed(tableData)
// const tableData = [
//   {
//     examName: '123',
//     examDescription: '1230',
//     startTime: '2022-11-23 13:46:00',
//     examDuration: '123'
//     // numberOfExaminees:'13246'
//   },
//   {
//     examName: '123',
//     examDescription: '1230',
//     startTime: '2023-11-23 13:46:00',
//     examDuration: '123'
//     // numberOfExaminees:'13246'
//   },
//   {
//     examName: '123',
//     examDescription: '1230',
//     startTime: '2023-10-20 13:46:00',
//     // numberOfExaminees:'13',
//     examDuration: '123'
//     // numberOfExaminees:'13246'
//   }
// ]
</script>

<style lang="scss" scoped>
.selectbox {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.selector {
  // height: 60px;
  // background-color: #ee9595;
  display: flex;
  // width: 100%;
  &-left {
    display: flex;
    align-items: center;
    &-item {
      margin-right: 10px;
      padding: 7px 12px;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
    }
    &-item:hover {
      background-color: #e1def2;
    }
    .selected {
      background-color: #e1def2;
    }
  }
}
.show {
  display: flex;
  &-input {
    margin-right: 20px;
  }
}
</style>
