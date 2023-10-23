<script setup lang="ts">
import { ref } from "vue";
import "../../../sass/paper/subQuestions.scss";
const props = defineProps(["index", "subText", "getAnswer"]);
const textareaText = ref("");
</script>
<template>
  <div class="subQuestions">
    <div class="subQuestions-topic">
      <span class="subQuestions-topic-label">{{ props.index + 1 }}</span>
      <span class="subQuestions-topic-detail"> {{ props.subText }}? </span>
    </div>
    <div class="subQuestions-textarea_box">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入你的答案"
        v-model="textareaText"
        @blur="props.getAnswer(props.index, 2, textareaText)"
      >
      </el-input>
    </div>
  </div>
</template>
