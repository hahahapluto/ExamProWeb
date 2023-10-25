<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { findQuesByPaperId } from '../../request/api/paper/paper'
import { getAllExamRecord, updateUserExamScore } from '../../request/api/record/userExamRecord'
import '../../sass/paper/createPaper.scss'
import pinia from '../../stores'
import paperStore from '../../stores/paperStore'
import { showQuesUserRecord } from '../../types/paper'
import multipleShow from '../paper/paperComponent/multipleShow.vue'
import quesSequence from '../paper/paperComponent/quesSequence.vue'
import subShowQues from '../paper/paperComponent/subShowQues.vue'

interface quesData {
  questionId: number
  questionType: string
  questionDescription: string
  questionAnswer: string
  questionScore: string
}

const paperData = paperStore(pinia)
// 左侧-题目序列数据
const quesSequenceDatas = ref<showQuesUserRecord[]>([
  {
    name: '单选题',
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
    userAnswer: [] as string[],
    quesAnswer: [] as string[],
    userGetScore: [] as number[],
    totalScore: [] as number[]
  },
  {
    name: '多选题',
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
    userAnswer: [] as string[],
    quesAnswer: [] as string[],
    userGetScore: [] as number[],
    totalScore: [] as number[]
  },
  {
    name: '主观题',
    score: 0,
    lists: [] as number[],
    actives: [] as boolean[],
    answer: [] as string[],
    userAnswer: [] as string[],
    quesAnswer: [] as string[],
    userGetScore: [] as number[],
    totalScore: [] as number[]
  }
])

// 将选项转换成数组
function extractQuestionAndOptions(text: string) {
  let all = text.split('(exampro)')
  let question = all[0]
  let options = extractValues(all[1])
  return [question, ...options]
}

function extractValues(text: string) {
  const values = text.split('&').map(item => {
    const parts = item.split('=')
    if (parts.length === 2) {
      return parts[1]
    }
    return null
  })

  return values.filter(value => value !== null)
}

// 单选题内容
let danXuan = ref<string[][]>([])
// 多选题内容
let duoXuan = ref<string[][]>([])
// 主观题内容
let subText = ref<string[]>([])
// 试卷的题目数据
let quesDatas: quesData[] = []

// 初始化数据
const InitializedData = () => {
  quesSequenceDatas.value = [
    {
      name: '单选题',
      score: 0,
      lists: [] as number[],
      actives: [] as boolean[],
      answer: [] as string[],
      userAnswer: [] as string[],
      quesAnswer: [] as string[],
      userGetScore: [] as number[],
      totalScore: [] as number[]
    },
    {
      name: '多选题',
      score: 0,
      lists: [] as number[],
      actives: [] as boolean[],
      answer: [] as string[],
      userAnswer: [] as string[],
      quesAnswer: [] as string[],
      userGetScore: [] as number[],
      totalScore: [] as number[]
    },
    {
      name: '主观题',
      score: 0,
      lists: [] as number[],
      actives: [] as boolean[],
      answer: [] as string[],
      userAnswer: [] as string[],
      quesAnswer: [] as string[],
      userGetScore: [] as number[],
      totalScore: [] as number[]
    }
  ]
  danXuan.value = []
  duoXuan.value = []
  subText.value = []
}

// 获取试卷的题目数据
const getQuesDataByPaperId = async (paperId: Number) => {
  InitializedData()
  let res = await findQuesByPaperId(paperId)
  let userAnswerData = (await getAllExamRecord(paperData.scoreExamId)).data.data
  quesDatas = res.data.data
  console.log(quesDatas)
  if (!quesDatas) return
  quesDatas.map((item: quesData) => {
    if (item.questionType === '0') {
      // type = "主观题";
      quesSequenceDatas.value[2].lists.push(item.questionId)
      quesSequenceDatas.value[2].quesAnswer.push(item.questionAnswer)
      quesSequenceDatas.value[2].score += Number.parseInt(item.questionScore)
      subText.value.push(item.questionDescription)
    } else if (item.questionType === '1') {
      // type = "单选题";
      quesSequenceDatas.value[0].quesAnswer.push(item.questionAnswer)
      quesSequenceDatas.value[0].lists.push(item.questionId)
      quesSequenceDatas.value[0].score += Number.parseInt(item.questionScore)
      let questionAndOptions: any = extractQuestionAndOptions(item.questionDescription)

      if (questionAndOptions !== null) {
        danXuan.value.push(questionAndOptions)
      } else {
        // 处理无效数据，例如记录日志或发出警告
        console.warn('Invalid question data:', item.questionDescription)
      }
    } else {
      // type = "多选题";
      quesSequenceDatas.value[1].lists.push(item.questionId)
      quesSequenceDatas.value[1].quesAnswer.push(item.questionAnswer)
      quesSequenceDatas.value[1].score += Number.parseInt(item.questionScore)
      let questionAndOptions: any = extractQuestionAndOptions(item.questionDescription)

      if (questionAndOptions !== null) {
        duoXuan.value.push(questionAndOptions)
      } else {
        // 处理无效数据，例如记录日志或发出警告
        console.warn('Invalid question data:', item.questionDescription)
      }
    }
  })

  // 遍历题目数组
  for (const category of quesSequenceDatas.value) {
    category.lists.forEach(item => {
      // 查找匹配的记录
      const matchingRecord = userAnswerData.find((record: { questionId: any }) => record.questionId === item)

      // 如果找到匹配的记录，将答案存入对应的 userAnswer 字段
      if (matchingRecord) {
        category.userAnswer.push(matchingRecord.studentAnswer)
        category.totalScore.push(matchingRecord.totalScore)
      }
    })
  }

  // 现在，questionArray 中的每个题目对象都有了对应的 userAnswer 字段
  console.log(quesSequenceDatas.value)
}

// 获取题目的答案
const getAnswer = (index: number, type: number, userGetScore: number) => {
  quesSequenceDatas.value[type].userGetScore[index] = userGetScore
}

onMounted(() => {
  getQuesDataByPaperId(paperData.paperId)
})

const finishGetScore = async () => {
  // updateUserExamScore(paperData.scoreExamId,)
  for (const category of quesSequenceDatas.value) {
    for (let i = 0; i < category.lists.length; i++) {
      // console.log(paperData.scoreExamId, category.lists[i], category.userGetScore[i])
      const { code } = (await updateUserExamScore(paperData.scoreExamId, category.lists[i], category.userGetScore[i])).data
      if (code == 1) {
        ElMessage.error('上传错误,请重新上传')
        break
      }
    }
  }
  ElMessage.success('评卷成功')
}
</script>
<template>
  <el-container>
    <el-aside width="280px" class="quesSequenceBox">
      <div class="quesSequenceBox-title">题目序列</div>
      <quesSequence v-for="item in quesSequenceDatas" v-show="item.lists.length != 0" :quesSequenceData="item" />
      <el-button @click="finishGetScore()">评卷完成</el-button>
    </el-aside>
    <el-main class="createPaper">
      <div class="createPaper-info">
        <div class="createPaper-paperName">
          <h1>{{ paperData.paperName }}</h1>
        </div>
      </div>
      <!-- <div class="createPaper-addTopic" @click="dialogFormVisible = true"></div> -->
      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[0].lists.length">一. 单选题（共{{ quesSequenceDatas[0].lists.length }}题，{{ quesSequenceDatas[0].score }}分）</h1>
      <multipleShow
        v-for="(item, index) in danXuan"
        :type="0"
        :key="index"
        :index="index"
        :danxuan="item"
        :getAnswer="getAnswer"
        :userAnswer="quesSequenceDatas[0].userAnswer[index]"
        :quesAnswer="quesSequenceDatas[0].quesAnswer[index]"
        danflag="true"
        :totalScore="quesSequenceDatas[0].totalScore[index]" />
      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[1].lists.length">二. 多选题（共{{ quesSequenceDatas[1].lists.length }}题，{{ quesSequenceDatas[1].score }}分）</h1>
      <multipleShow
        v-for="(item, index) in duoXuan"
        :type="1"
        :key="index"
        :index="index"
        :danxuan="item"
        :getAnswer="getAnswer"
        :userAnswer="quesSequenceDatas[1].userAnswer[index]"
        :quesAnswer="quesSequenceDatas[1].quesAnswer[index]"
        danflag="false"
        :totalScore="quesSequenceDatas[1].totalScore[index]" />
      <h1 style="margin: 20px 20px" v-if="quesSequenceDatas[2].lists.length">三. 主观题（共{{ quesSequenceDatas[2].lists.length }}题，{{ quesSequenceDatas[2].score }}分）</h1>
      <subShowQues v-for="(item, index) in subText" :type="21" :key="index" :index="index" :subText="item" :getAnswer="getAnswer" :userAnswer="quesSequenceDatas[2].userAnswer[index]" :quesAnswer="quesSequenceDatas[2].quesAnswer[index]" />
    </el-main>
  </el-container>
</template>
<style>
.createPaper {
  height: 80vh;
}
</style>
