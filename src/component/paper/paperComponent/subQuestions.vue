<script setup lang="ts">
import { ref } from "vue";
import "../../../sass/paper/subQuestions.scss";

const textareaText = ref("");
</script>
<template>
  <div class="subQuestions">
    <div class="subQuestions-topic">
      <span class="subQuestions-topic-label">1</span>
      <span class="subQuestions-topic-detail"> 说明软件本质特性有哪些? </span>
    </div>
    <div class="subQuestions-textarea_box">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入你的答案"
        v-model="textareaText"
      >
      </el-input>
    </div>
  </div>
</template>
