<template>
  <answer :answerData="answerData"></answer>
</template>

<script setup lang="ts">
import answer from '../paper/popup/answer.vue';
const answerData = {
  myanswer: 'dhasld',
  correct: '1234',
  res: 'false'
}
</script>

<style lang="scss" scoped></style>
