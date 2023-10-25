<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '../../../sass/paper/multipleChoice.scss';
import answer from '../popup/answer.vue';
const props = defineProps(['type', 'index', 'danxuan', 'getAnswer', 'userAnswer', 'quesAnswer','totalScore','getAnswer','danflag'])

const actives = ref([false, false, false, false])


let res:String = (props.quesAnswer == props.userAnswer).toString()
let resScore = 0
if (res == "true") {
  resScore = props.totalScore
} else {
  resScore = 0
}
const answerData = {
  myanswer: props.userAnswer,
  correct: props.quesAnswer,
  res: (props.quesAnswer == props.userAnswer).toString()
}
onMounted(() => {
  if (props.danflag=='true') {
    props.getAnswer(props.index, 0, resScore)
  } else {
    props.getAnswer(props.index, 1, resScore)
  }
})
</script>
<template>
  <div class="multipleChoice">
    <div class="multipleChoice-topic">
      <span class="multipleChoice-topic-label">{{ props.index + 1 }}</span>
      <span class="multipleChoice-topic-detail">
        {{ props.danxuan[0] }}
      </span>
    </div>
    <div class="multipleChoice-options">
      <span class="multipleChoice-options-label" :class="{ active: actives[0] }">A</span>
      <span class="multipleChoice-options-option">
        {{ props.danxuan[1] }}
      </span>
    </div>
    <div class="multipleChoice-options">
      <span class="multipleChoice-options-label" :class="{ active: actives[1] }">B</span>
      <span class="multipleChoice-options-option">
        {{ props.danxuan[2] }}
      </span>
    </div>
    <div class="multipleChoice-options">
      <span class="multipleChoice-options-label" :class="{ active: actives[2] }">C</span>
      <span class="multipleChoice-options-option"> {{ props.danxuan[3] }}</span>
    </div>
    <div class="multipleChoice-options">
      <span class="multipleChoice-options-label" :class="{ active: actives[3] }">D</span>
      <span class="multipleChoice-options-option">
        {{ props.danxuan[4] }}
      </span>
    </div>
    <div class="answerBox">
      <answer :answerData="answerData"></answer>
    </div>
    <div class="getScore">
      {{resScore}} 分
    </div>
  </div>
</template>
<style lang="scss" scoped>
.answerBox {
  margin-top: 20px;
  // padding: 0px 20px;
}

</style>
