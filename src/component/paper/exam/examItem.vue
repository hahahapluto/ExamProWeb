<template>
  <div class="showbox-exam-item">
    <div class="showbox-exam-item-title">
      {{ props.tableData.examName }}
    </div>
    <div
      v-if="props.tableData.examDescription"
      class="showbox-exam-item-describe"
    >
      {{ props.tableData.examDescription }}
    </div>
    <div class="showbox-exam-item-detail">
      <div class="showbox-exam-item-detail-starttime">
        <el-icon class="examicon" color="#626aef"><Loading /></el-icon
        >{{ timeTransform(props.tableData.startTime) }}
      </div>
      <div class="showbox-exam-item-detail-duration">
        <el-icon class="examicon" color="#626aef"><Clock /></el-icon>限时<span
          style="font-weight: 700; margin: 0px 2px"
          >{{ props.tableData.examDuration }}</span
        >分钟
      </div>
      <div
        class="showbox-exam-item-detail-numberOfExam"
        v-if="props.tableData.numberOfExaminees !== null"
      >
        <el-icon class="examicon" color="#626aef"><UserFilled /></el-icon
        >考试人数：<span style="font-weight: 700; margin: 0px 2px">{{
          props.tableData.numberOfExaminees
        }}</span
        >人
      </div>
      <div class="showbox-exam-item-detail-state">
        <el-icon class="examicon" color="#626aef"><Promotion /></el-icon
        >状态：<span
          style="font-weight: 700; margin: 0px 2px"
          :class="
            getStatusClass(
              getExamStatus(
                props.tableData.startTime,
                props.tableData.examDuration
              )
            )
          "
          >{{
            getExamStatus(
              props.tableData.startTime,
              props.tableData.examDuration
            )
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//显式声明所接受的 props
const props = defineProps(["tableData"]);

function getExamStatus(startTimeStr: string, durationMinutes: number) {
  // 将输入的开始时间字符串转换为日期对象
  const startTime = new Date(startTimeStr);
  // 获取当前时间
  const currentTime = new Date();
  // 计算结束时间
  const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);
  if (currentTime < startTime) {
    // 考试未开始
    return "未开始";
  } else if (currentTime >= startTime && currentTime <= endTime) {
    // 考试进行中
    return "考试中";
  } else {
    // 考试已结束
    return "已结束";
  }
}

// 定义获取状态样式类的函数
const getStatusClass = (status: string) => {
  if (status === "未开始") {
    return "status-gray";
  } else if (status === "考试中") {
    return "status-blue";
  } else if (status === "已结束") {
    return "status-red";
  } else {
    return "status-default";
  }
};

function timeTransform(time: string) {

  const inputDate = new Date(time);
  // 提取年、月、日、小时和分钟
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1; // 月份从0开始，所以需要加1
  const day = inputDate.getDate();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  // 格式化为 "yyyy-mm-dd hh:mm:00" 格式
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;
  return formattedDate;
}
</script>
<style lang="scss">
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
        margin-top: 15px;
        display: flex;
        align-content: center;
        // height: 25px;
        line-height: 25px;
        flex-wrap: wrap;
        font-size: 14px;
        &-starttime {
          margin-right: 15px;
          display: flex;
          align-items: center;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        &-duration {
          margin-right: 15px;
          display: flex;
          // margin-bottom: 6px;
          align-items: center;
        }
        &-numberOfExam {
          // margin-top: 5px;
          display: flex;
          align-items: center;
          margin-right: 15px;
        }
        &-state {
          // margin-top: 6px;
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

.status-gray {
  color: gray;
}

.status-red {
  color: #8584ff;
}

.status-blue {
  color: #f96565;
}
</style>
