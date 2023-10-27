<script setup lang="ts">
import { ref } from 'vue'
import { getExamineeExams } from '../../request/api/exam/examRegistration'
// import { isUserDoneExam } from '../../request/api/record/userExamRecord';
import pinia from '../../stores'
import paperStore from '../../stores/paperStore'
import { myExamRecord } from '../../types/exam'
import examItem from '../paper/exam/examItem.vue'
const paperData = paperStore(pinia)
let examData: myExamRecord[] = []
let tableData = ref<myExamRecord[]>([])

const getExamData = async () => {
  // 获取个人的考试
  examData = (await getExamineeExams()).data.data
  // tableData.value = filterObjectsByEndTime(examData)
  tableData.value = filterObjectsByEndTime(examData)
  
  console.log(tableData.value)
}

function filterObjectsByEndTime(data: myExamRecord[]) {
  // 获取当前时间的时间戳（以毫秒为单位）
  const currentTime = new Date().getTime()

  // 使用 Array.filter 方法筛选 endTime 在当前时间之前的对象
  const filteredObjects = data.filter(obj => {
    // 将 endTime 字段解析为时间戳
    const endTimeTimestamp = new Date(obj.endTime).getTime()

    // 返回 endTime 在当前时间之前的对象
    return endTimeTimestamp <= currentTime
  })

  return filteredObjects
}

// 响应式变量，用于存储当前选择的状态，默认为"全部"
getExamData()

// 进入考试
const enterExam = ($router: any, index: number) => {
  // if ($router.currentRoute.value.fullPath == "/index/myExam") {
  //   console.log("进入考试");
    paperData.paperName = tableData.value[index].examName;
    paperData.scoreExamId = tableData.value[index].examId;
  //   $router.push("/index/enterExam");
  // } else {
  paperData.paperId = tableData.value[index].paperId
  // }
  paperData.scoreExamId = tableData.value[index].examId
  console.log(paperData.paperId,paperData.scoreExamId)
  $router.push('/index/myExamRecordPaper')
}
</script>
<template>
  <div>
    <!-- <div class="selectbox"> -->
    <!-- <div class="selector">
        <div class="selector-left">
          <div
            class="selector-left-item"
            @click="chooseStates('全部')"
            :class="{ selected: selectedState === '全部' }"
          >
            全部
          </div>
          <div
            class="selector-left-item"
            @click="chooseStates('未开始')"
            :class="{ selected: selectedState === '未开始' }"
          >
            未开始
          </div>
          <div
            class="selector-left-item"
            @click="chooseStates('考试中')"
            :class="{ selected: selectedState === '考试中' }"
          >
            已开始
          </div>
          <div
            class="selector-left-item"
            @click="chooseStates('已结束')"
            :class="{ selected: selectedState === '已结束' }"
          >
            已过期
          </div>
        </div>
        <div class="selector-right">
          <div class="selector-right-input"></div>
          <div class="selector-right-button"></div>
        </div>
      </div> -->
    <!-- <div class="show">
        <el-input class="w-50 m-2 show-input" placeholder="请输入考试名称" />
        <el-button
          class="show-button"
          color="#626aef"
          style="color: aliceblue"
          size="large"
          >搜索考试</el-button
        >
      </div>
    </div> -->
    <!-- 在线考试 -->
    <div class="showbox">
      <div class="showbox-exam">
        <examItem v-for="(item, index) in tableData" :tableData="item" @click="enterExam($router, index)"></examItem>
      </div>
    </div>
  </div>
</template>
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
