<script setup lang="ts">
// import Login from "./views/login.vue";
// import Index from "./views/index.vue";
// import Login from "./views/login.vue"
</script>

<template>
  <!-- <Login></Login> -->
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
img {
  width: 100%;
  height: 100%;
}

body::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}

body::-webkit-scrollbar-thumb {
  border: 1px solid #fff;
  border-radius: 6px;
  background: #4b4b4b;
}
</style>
