<template>
  <div class="box">
    <div class="box-myanswer">
      <div class="box-myanswer-top">我的答案：</div>
      <div class="box-myanswer-bottom">ABC</div>
    </div>
    <div class="box-correct">
      <div class="box-correct-top">正确答案：</div>
      <div class="box-correct-bottom">DEF</div>
    </div>
    <div class="box-status">
      <img src="../../../assets/true.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.box {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px;
  &-myanswer {
    background-color: #645edd;
  }
  &-correct {
    background-color: #87ed57;
  }
  &-status {
    background-color: #cf6060;
  }
}
</style>
