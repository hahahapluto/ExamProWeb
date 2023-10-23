<script lang="ts" setup>
import "../../../sass/paper/quesSequence.scss";
import { quesSequenceType } from "../../../types/paper";
const props = defineProps<{ quesSequenceData: quesSequenceType }>();
</script>
<template>
  <div class="quesSequence">
    <div class="quesSequence-title">
      <span class="quesName">{{ props.quesSequenceData.name }}</span>
      <span class="quesScore">{{ props.quesSequenceData.score }}分</span>
    </div>
    <div class="quesSequence-lists">
      <span
        v-for="(item, index) in props.quesSequenceData.lists"
        :key="item"
        class="quesSequence-lists_item"
        :class="{ active: quesSequenceData.actives[index] }"
        >{{ index + 1 }}</span
      >
    </div>
  </div>
</template>
