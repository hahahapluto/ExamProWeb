<script setup lang="ts">
import "../../../sass/paper/multipleChoice.scss";
</script>
<template>
  <div class="multipleChoice">
    <div class="multipleChoice-topic">
      <span class="multipleChoice-topic-label">1</span>
      <span class="multipleChoice-topic-detail">
        汇编程序语言中，以下哪个指令的寻址方式为基址变址寻址
      </span>
    </div>
    <div class="multipleChoice-options" v-for="index in 4">
      <span class="multipleChoice-options-label"> {{ index }}</span>
      <span class="multipleChoice-options-option"> MOV AX, BX </span>
    </div>
  </div>
</template>
