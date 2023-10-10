<template>
  <div>
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
    <div class="showbox">
      <div class="showbox-exam">
        <div class="showbox-exam-item">
          <div class="showbox-exam-item-title">计算机网络</div>
          <div class="showbox-exam-item-describe">我是考试地描述</div>
          <div class="showbox-exam-item-detail">
            <div class="showbox-exam-item-detail-starttime"><el-icon class="examicon" color="#626aef"><Loading /></el-icon>2023-15-40</div>
            <div class="showbox-exam-item-detail-duration"><el-icon class="examicon" color="#626aef"><Clock /></el-icon>限时90分钟</div>
            <div class="showbox-exam-item-detail-numberOfExam"><el-icon class="examicon" color="#626aef"><UserFilled /></el-icon>考试人数：1人</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
const showInput = ref('')
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
  &-exam {
    padding: 40px;
    &-item {
      // background-color: #f6a2a2;
      padding: 20px 30px;
      width: 330px;
      height: 160px;
      border: #eeeeee 1px solid;
      box-shadow: 0px 2px 4px #ccc;
      border-radius: 5px;
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
        }
        &-duration {
          margin-right: 15px;
          display: flex;
          align-items: center;
        }
        &-numberOfExam{
          // margin-top: 5px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
.examicon{
  margin-right:5px ;
}
</style>
