<script setup lang="ts">
import { ref } from "vue";
import "../../../sass/paper/multipleChoice.scss";
const props = defineProps(["type", "index", "danxuan", "getAnswer"]);

const actives = ref([false, false, false, false]);
const onActive = (index: number) => {
  let answer: string = "";
  // 单选
  if (props.type == "0") {
    for (let i = 0; i < actives.value.length; i++) {
      if (i != index) {
        actives.value[i] = false;
      } else {
        actives.value[i] = true;
        if (i == 0) {
          answer = "A";
        } else if (i == 1) {
          answer = "B";
        } else if (i == 2) {
          answer = "C";
        } else {
          answer = "D";
        }
      }
    }
  } else {
    actives.value[index] = !actives.value[index];
    for (let i = 0; i < actives.value.length; i++) {
      if (actives.value[i] == true) {
        if (i == 0) {
          answer += "A";
        } else if (i == 1) {
          answer += "B";
        } else if (i == 2) {
          answer += "C";
        } else {
          answer += "D";
        }
      }
    }
  }
  props.getAnswer(props.index, props.type, answer);
};
</script>
<template>
  <div class="multipleChoice">
    <div class="multipleChoice-topic">
      <span class="multipleChoice-topic-label">{{ props.index + 1 }}</span>
      <span class="multipleChoice-topic-detail">
        {{ props.danxuan[0] }}
      </span>
    </div>
    <div class="multipleChoice-options" @click="onActive(0)">
      <span class="multipleChoice-options-label" :class="{ active: actives[0] }"
        >A</span
      >
      <span class="multipleChoice-options-option">
        {{ props.danxuan[1] }}
      </span>
    </div>
    <div class="multipleChoice-options" @click="onActive(1)">
      <span class="multipleChoice-options-label" :class="{ active: actives[1] }"
        >B</span
      >
      <span class="multipleChoice-options-option">
        {{ props.danxuan[2] }}
      </span>
    </div>
    <div class="multipleChoice-options" @click="onActive(2)">
      <span class="multipleChoice-options-label" :class="{ active: actives[2] }"
        >C</span
      >
      <span class="multipleChoice-options-option"> {{ props.danxuan[3] }}</span>
    </div>
    <div class="multipleChoice-options" @click="onActive(3)">
      <span class="multipleChoice-options-label" :class="{ active: actives[3] }"
        >D</span
      >
      <span class="multipleChoice-options-option">
        {{ props.danxuan[4] }}
      </span>
    </div>
  </div>
</template>
