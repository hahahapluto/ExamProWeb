<script lang="ts" setup>
import "../../sass/Popover/popUp.scss";
import { ref } from "vue";
import router from "../../router/index.ts";
import SettingPages from "./settingPages.vue";
import { sessionGetData } from "../../hooks/useStorage.ts";

// 我的设置
const modifyForm = ref(false);

// 退出登录
const exist = () => {
  router.push("/login");
  sessionStorage.clear();
  localStorage.clear();
};

// 改变 modifyForm 的状态
const closeModify = () => {
  modifyForm.value = false;
};
</script>

<template>
  <div class="setting">
    <div class="setting-user">
      <div class="setting-user-portrait">
        <img src="../../assets/user.jpg" />
      </div>
      <div class="setting-user-info" :title="sessionGetData('username')">
        {{ sessionGetData("username") ? sessionGetData("username") : "pluto" }}
      </div>
    </div>
    <div class="setting-line"></div>
    <div class="setting-common" @click="modifyForm = true">
      <div class="icon iconfont icon-xiugai"></div>
      <div class="setting-common-name">我的设置</div>
    </div>
    <el-dialog title="我的设置" v-model="modifyForm" width="540px">
      <SettingPages :closeModify="closeModify"></SettingPages>
    </el-dialog>
    <div class="setting-common setting-warn" @click="exist">
      <div class="icon iconfont icon-h"></div>
      <div class="setting-common-name">退出登录</div>
    </div>
  </div>
</template>
