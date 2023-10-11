<template>
  <div>
    <!-- 筛选 -->
    <div class="selectbox">
      <div class="selector">
        <div class="selector-left">
          <div class="selector-left-item">全部</div>
          <div class="selector-left-item">未开始</div>
          <div class="selector-left-item">已开始</div>
          <div class="selector-left-item">已过期</div>
        </div>
        <div class="selector-right">
          <div class="selector-right-input"></div>
          <div class="selector-right-button"></div>
        </div>
      </div>
      <div class="show">
        <el-input class="w-50 m-2 show-input" placeholder="Type something" v-model="showInput" :suffix-icon="Search" />
        <el-button class="show-button" color="#626aef" style="color: aliceblue" size="large">搜索试卷</el-button>
      </div>
    </div>
    <!-- 展示 -->
    <div class="showbox">
      <div class="showbox-exam">
        <div class="showbox-exam-item first" @click="dialogFormVisible = true"></div>
        <div class="showbox-exam-item" v-for="item in tableData">
          <div class="showbox-exam-item-title">{{ item.examName }}</div>
          <div class="showbox-exam-item-describe">{{ item.examDescription }}</div>
          <div class="showbox-exam-item-detail">
            <div class="showbox-exam-item-detail-starttime">
              <el-icon class="examicon" color="#626aef"><Loading /></el-icon>{{ item.startTime }}
            </div>
            <div class="showbox-exam-item-detail-duration">
              <el-icon class="examicon" color="#626aef"><Clock /></el-icon>限时<span style="font-weight: 700; margin: 0px 2px">{{ item.examDuration }}</span
              >分钟
            </div>
            <div class="showbox-exam-item-detail-numberOfExam">
              <el-icon class="examicon" color="#626aef"><UserFilled /></el-icon>考试人数：<span style="font-weight: 700; margin: 0px 2px">{{ item.numberOfExaminees }}</span
              >人
            </div>
          </div>
        </div>
        <!-- <div class="showbox-exam-item">
          <div class="showbox-exam-item-title">计算机网络</div>
          <div class="showbox-exam-item-describe">我是考试地描述</div>
          <div class="showbox-exam-item-detail">
            <div class="showbox-exam-item-detail-starttime">
              <el-icon class="examicon" color="#626aef"><Loading /></el-icon>2023-15-40
            </div>
            <div class="showbox-exam-item-detail-duration">
              <el-icon class="examicon" color="#626aef"><Clock /></el-icon>限时90分钟
            </div>
            <div class="showbox-exam-item-detail-numberOfExam">
              <el-icon class="examicon" color="#626aef"><UserFilled /></el-icon>考试人数：1人
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- 新增考试 -->
    <el-dialog v-model="dialogFormVisible" title="新增考试">
      <el-form :model="examForm" ref="ruleFormRef" :rules="rules">
        <el-form-item label="考试名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="examForm.name" autocomplete="off" :autosize="{ minRows: 3, maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="考试描述" :label-width="formLabelWidth" prop="describe">
          <el-input v-model="examForm.describe" autocomplete="off" :autosize="{ minRows: 5, maxRows: 5 }" type="textarea" placeholder="请输入题目内容" maxlength="300" show-word-limit />
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth" prop="examStartTime">
          <el-row>
            <el-date-picker v-model="examForm.examStartTime" type="datetime" placeholder="请选择考试开始时间" class="w-50 m-2" />
            <span style="margin: 0px 15px 0px 40px">考试时长</span>
            <el-input-number v-model="examForm.duration" :min="0" :max="300" class="w-50 m-2" :step="10" />
          </el-row>
        </el-form-item>
        <el-form-item label="选择考卷" :label-width="formLabelWidth" prop="paper">
          <el-select v-model="examForm.paper" placeholder="please select your zone">
            <el-option :label="item.paperName" :value="item.paperId" :id="item.paperId" v-for="item in paperData" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button type="primary" @click="addExamButton(ruleFormRef)" color="#626aef" style="color: aliceblue"> 添加 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { reactive, ref } from 'vue'
import { addExam, getMyExam } from '../../request/api/paper/exam'
import { getPaper } from '../../request/api/paper/paper'
import { commonRules } from '../../utils/question'

interface examInterface {
  name: string
  describe: string
  examStartTime: string
  duration: Number
  paper: string
}

const showInput = ref('')
let dialogFormVisible = ref(false)
const examForm = reactive<examInterface>({
  name: '',
  examStartTime: '',
  describe: '',
  duration: 30,
  paper: ''
})
const formLabelWidth = '140px'
// 获取表单的ref
const ruleFormRef = ref<FormInstance>()
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
}

const addExamButton = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 首先调用表单验证
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(examForm.examStartTime)
      const inputDate = new Date(examForm.examStartTime)
      // 提取年、月、日、小时和分钟
      const year = inputDate.getFullYear()
      const month = inputDate.getMonth() + 1 // 月份从0开始，所以需要加1
      const day = inputDate.getDate()
      const hours = inputDate.getHours()
      const minutes = inputDate.getMinutes()

      // 格式化为 "yyyy-mm-dd hh:mm:00" 格式
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`

      console.log(formattedDate) // 输出格式化后的日期时间
      const examMessage = {
        name: examForm.name,
        describe: examForm.describe,
        paper: examForm.paper,
        examStartTime: formattedDate,
        duration: examForm.duration
      }
      console.log(examMessage)
      const { code, msg, data } = (await addExam(examForm.name, examForm.describe, examForm.paper, formattedDate, examForm.duration)).data
      console.log(code, msg, data)
      formEl.resetFields()
      // 成功弹窗
      ElMessage.success(msg)
      dialogFormVisible.value = false
      getExam()
    } else {
      console.log('error submit!', fields)
      return
    }
  })
}

let paperData: any = ref()
//获取试卷信息
const getPaperData = async () => {
  paperData = (await getPaper()).data.data
  console.log(paperData)
}
getPaperData()
// 验证规则
const rules = reactive<FormRules<examInterface>>({
  name: commonRules('题目类型', 'blur'),
  examStartTime: commonRules('题目类型', 'change'),
  describe: commonRules('考试描述', 'blur'),
  duration: commonRules('考试时间', 'change'),
  paper: commonRules('考试试卷', 'change')
})

let examData: any = ref<examInterface[]>()
let tableData: any = ref<examInterface[]>()
console.log(examData)
const getExam = async () => {
  examData = (await getMyExam()).data.data
  console.log(examData)
  examData.forEach((item: { startTime: string }) => {
    let date = new Date(item.startTime)
    item.startTime = date.toLocaleString()
  })
  // examData.forEach((item: { type: string; description: string }) => {
  //   if (item.type == '0') {
  //     item.type = '主观题'
  //   } else if (item.type == '1') {
  //     item.type = '单选题'
  //     item.description = formatExamString(item.description)
  //   } else {
  //     item.type = '多选题'
  //     item.description = formatExamString(item.description)
  //   }
  // })
  tableData.value = cloneDeep(examData)
}
getExam()
</script>
<style lang="scss" scoped>
.selectbox {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.selector {
  // height: 60px;
  // background-color: #ee9595;
  display: flex;
  width: 100%;
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
  }
}
.show {
  display: flex;
  &-input {
    margin-right: 20px;
  }
}
.showbox {
  width: 100%;
  &-exam {
    display: grid;
    padding: 30px 0px 30px 0;
    grid-template-columns: repeat(3, 1fr);
    // flex-wrap: wrap;
    // justify-content: space-between;
    // justify-content: space-between;
    &-item {
      // background-color: #f6a2a2;
      margin-left: 39px;
      padding: 20px 30px;
      // width: 330px;
      height: 160px;
      min-width: 280px;
      border: #eeeeee 1px solid;
      box-shadow: 0px 2px 4px #ccc;
      border-radius: 5px;
      margin-bottom: 35px;
      &-title {
        font-weight: 700;
        margin-top: 15px;
      }
      &-describe {
        margin-top: 15px;
        color: #bbb6bd;
        font-size: 15px;
      }
      &-detail {
        margin-top: 25px;
        display: flex;
        align-content: center;
        height: 25px;
        line-height: 25px;
        flex-wrap: wrap;
        font-size: 14px;
        &-starttime {
          margin-right: 15px;
          display: flex;
          align-items: center;
          font-weight: 700;
          letter-spacing: 1px;
        }
        &-duration {
          margin-right: 15px;
          display: flex;
          align-items: center;
        }
        &-numberOfExam {
          // margin-top: 5px;
          display: flex;
          align-items: center;
        }
      }
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-property: box-shadow, transform;
      transition-property: box-shadow, transform;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
    }
    &-item:hover {
      // background-image: url(../../assets/addhover.png);
      box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
      -webkit-transform: scale(1.1);
      transform: scale(1.05);
    }
  }
}
.examicon {
  margin-right: 5px;
}

.first {
  // width: 330px;
  // height: 160px;
  background-image: url(../../assets/add.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-size: 31% auto;
  background-position: 50% 50%;
  // box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
}
.first:hover {
  background-image: url(../../assets/addhover.png);
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.05);
}
.el-form-item__content {
  flex-wrap: nowrap;
}
</style>
