<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '../../../sass/paper/subQuestions.scss';
import answer from '../popup/answer.vue';
const props = defineProps(['index', 'subText', 'getAnswer','userAnswer','quesAnswer','isShowInput','isresScore'])
// console.log(props.userAnswer, props.quesAnswer)

const answerData = {
  myanswer: props.userAnswer,
  correct: props.quesAnswer
  // res: 'false'
}
console.log(props.isShowInput);

const onActive = () => {
  if (props.getAnswer) {
    props.getAnswer(props.index, 2, resScore.value)
  }
}
let resScore = ref(0);
onMounted(() => {
  if (props.getAnswer) {
    props.getAnswer(props.index, 2, 0)
  }
})
</script>
<template>
  <div class="subQuestions">
    <div class="subQuestions-topic">
      <span class="subQuestions-topic-label">{{ props.index + 1 }}</span>
      <span class="subQuestions-topic-detail"> {{ props.subText }}? </span>
    </div>
    <div class="answerBox">
      <answer :answerData="answerData"></answer>
    </div>
    <div class="resScore" v-if="props.isShowInput">
      <span style="margin-right: 10px">所得分数：</span>
      <el-input-number v-model="resScore" :min="0" :max="100" class="w-50 m-2" :step="1" @change="onActive()" />
    </div>
    <div class="getScore" v-if="!props.isShowInput">
      {{resScore || props.isresScore}} 分
    </div>
  </div>
</template>
<style lang="scss" scoped>
.answerBox {
  margin-top: 20px;
  // padding: 0px 20px;
}
.resScore {
  margin-top: 20px;
}

.getScore {
  position: absolute;
  top: 30px;
  right: 30px;
  // background-color: #f32c2c;
  color: #e62601;
  font-weight: 700;
  font-size: 20px;
}
</style>
