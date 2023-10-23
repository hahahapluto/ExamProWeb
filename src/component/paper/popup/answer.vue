<template>
  <div class="box">
    <div class="box-myanswer item">
      <div class="box-myanswer-top">我的答案：</div>
      <div class="box-myanswer-bottom">{{props.answerData.myanswer}}</div>
    </div>
    <div class="box-status item">
      <img src="../../../assets/true.png" alt="" v-if="props.answerData.res=='true'"/>
      <img src="../../../assets/false.png" alt="" v-if="props.answerData.res=='false'"/>
    </div>
    <div class="box-correct item">
      <div class="box-correct-top">正确答案：</div>
      <div class="box-correct-bottom">{{props.answerData.correct}}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//显式声明所接受的 props
const props = defineProps(['answerData'])
</script>
<style scoped lang="scss">
.box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 15px;
  grid-auto-rows: minmax(20px, auto);
  border: #e1e7f0 1px solid;
  border-left: #e1e7f0 5px solid;
  &-myanswer {
    grid-column: 1 / 3;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    &-top{
      margin-bottom: 5px;
    }
    &-bottom{
      margin: 0; // 可以删除默认的下外边距
      white-space: normal; // 允许文本换行
      word-wrap:normal;
    }
  }
  &-status {
    grid-column: 4 / 5;
    grid-row: 1 / 3;
    display: flex;
    align-items: center;
    margin-right: 20px;
    img{
      height:70px;
      width: auto;
    }
  }
  &-correct {
    color: #00B86E;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    margin-top: 10px;
    &-top{
      margin-bottom: 5px;
    }
    &-bottom{
      text-decoration: underline;
      white-space: normal; // 允许文本换行
    }
  }
}
</style>
