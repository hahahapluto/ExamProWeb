<script lang="ts" setup>
import { ElInput, ElForm, ElFormItem, ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import "../../sass/Popover/settingPages.scss";
import { checkIfUserExist } from "../../request/api/users/login";
import {
  modifyUsername,
  modifyPassword,
  checkPassword,
} from "../../request/api/users/modifyInfo";
import userStore from "../../stores/userStore.ts";
import pinia from "../../stores/index.ts";
import { sessionSaveData } from "../../hooks/useStorage.ts";
import type { ElFormInstance } from "../../types/components.d.ts";

const props = defineProps(["closeModify"]);
const userData = userStore(pinia); // 用户数据
// 修改用户名
let usernameFormRef = ref<ElFormInstance>(); // 修改用户名表单对象
let newUserInfo = reactive({
  username: "",
  oldPassword: "",
  newPassword: "",
  checkPassword: "",
});
// 检查新的用户名是否已经存在
const validateifUserExist = async (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请新的输入用户名"));
  } else {
    let ifUserExistServer = await checkIfUserExist(newUserInfo.username);
    let regData = ifUserExistServer.data;
    if (!regData.code) {
      callback("用户已存在");
    } else {
      callback();
    }
  }
};

// 确认修改用户名
const confirmUserName = () => {
  usernameFormRef.value?.validate(async (valid: any) => {
    // 如果表单的数据不合法则不发起请求
    if (!valid) return;
    let modifyServe = await modifyUsername(newUserInfo.username);
    let modifyData = modifyServe.data;
    if (modifyData.code) {
      ElMessage.error(modifyData.msg);
    } else {
      ElMessage.success(modifyData.msg);
      userData.username = modifyData.data.username;
      sessionSaveData("username", modifyData.data.username);
      newUserInfo.username = "";
      props.closeModify();
    }
  });
};

// 修改密码
let passwordFormRef = ref<ElFormInstance>();
// 检查旧密码是否正确
const validateOldPass = async (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入原始密码"));
  } else {
    if (newUserInfo.oldPassword !== "") {
      let oldPassSever = await checkPassword(newUserInfo.oldPassword);
      console.log(oldPassSever);
      let oldPassData = oldPassSever.data;
      if (oldPassData.code) {
        callback(new Error(oldPassData.msg));
      } else {
        callback();
      }
    }
    callback();
  }
};

// 检查新密码
const validateNewPass = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (newUserInfo.checkPassword !== "") {
      passwordFormRef.value?.validateField("checkPassword");
    }
    callback();
  }
};

// 二次校验密码
const validateCheckPass = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== newUserInfo.newPassword) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

// 确认修改密码
const confirmPassword = () => {
  passwordFormRef.value?.validate(async (valid: any) => {
    // 如果表单的数据不合法则不发起请求
    if (!valid) return;
    let modifyServe = await modifyPassword(newUserInfo.newPassword);
    let modifyData = modifyServe.data;
    if (modifyData.code) {
      ElMessage.error(modifyData.msg);
    } else {
      // ElMessage.success(modifyData.msg);
      // userData.password = modifyData.password;
      // sessionSaveData("password", modifyData.password);
      newUserInfo.oldPassword = "";
      newUserInfo.newPassword = "";
      newUserInfo.checkPassword = "";
      props.closeModify();
    }
  });
};

// 表单的验证规则对象
let userInfoRules = reactive<any>({
  // 验证新的用户名是否合法
  username: [
    {
      min: 3,
      max: 10,
      message: "用户名长度应在 3-10 个字符",
      trigger: "blur",
    },
    { validator: validateifUserExist, trigger: "blur" },
  ],
  oldPassword: [{ validator: validateOldPass, trigger: "blur" }],
  newPassword: [
    { min: 6, max: 15, message: "密码长度应在 6-15 个字符", trigger: "blur" },
    { validator: validateNewPass, trigger: "blur" },
  ],
  checkPassword: [{ validator: validateCheckPass, trigger: "blur" }],
});

// 重置表单
const resetFrom = () => {
  passwordFormRef.value?.resetFields();
  usernameFormRef.value?.resetFields();
};
</script>

<template>
  <el-tabs
    type="border-card"
    tab-position="left"
    class="card"
    @tab-click="resetFrom"
  >
    <el-tab-pane label="修改用户名">
      <el-form
        ref="usernameFormRef"
        :model="newUserInfo"
        :rules="userInfoRules"
        label-width="100px"
        autocomplete="off"
      >
        <el-form-item label="用户名：" prop="username" class="formItemCommon">
          <ElInput
            placeholder="请输入新的用户名"
            v-model="newUserInfo.username"
            input-style="height:35px;"
            autocomplete="off"
          ></ElInput>
        </el-form-item>
        <el-form-item class="btns">
          <button class="confirm" @click="confirmUserName">立即修改</button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改密码">
      <ElForm
        ref="passwordFormRef"
        :model="newUserInfo"
        :rules="userInfoRules"
        label-width="100px"
      >
        <ElFormItem
          label="原始密码："
          prop="oldPassword"
          class="formItemCommon"
        >
          <ElInput
            placeholder="请输入原始密码"
            v-model="newUserInfo.oldPassword"
            input-style="height:35px;"
            autocomplete="off"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="修改密码：" prop="newPassword">
          <ElInput
            placeholder="请输入新的密码"
            v-model="newUserInfo.newPassword"
            input-style="height:35px;"
            show-password
            type="password"
            autocomplete="off"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="确认密码：" prop="checkPassword">
          <ElInput
            placeholder="请再次输入密码"
            v-model="newUserInfo.checkPassword"
            input-style="height:35px;"
            show-password
            type="password"
          ></ElInput>
        </ElFormItem>
        <ElFormItem class="btns">
          <button class="confirm" @click="confirmPassword">立即修改</button>
        </ElFormItem>
      </ElForm>
    </el-tab-pane>
  </el-tabs>
</template>
