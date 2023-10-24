<script lang="ts" setup>
import { ElPopover } from "element-plus";
import PopUp from "../component/index/popUp.vue";
import { jumpPath } from "../hooks/useStorage";
import "../sass/index/index.scss";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// 点击跳转对应路由
// const jumpPath = function ($router: any, path: String) {
//   $router.push("/index/" + path);
// };
</script>

<template>
  <div class="common">
    <el-container class="common-con">
      <el-aside class="common-con-aside">
        <el-row class="tac">
          <el-col>
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><i class="icon iconfont icon-kaoshi"></i></el-icon>
                  <span>考试</span>
                </template>
                <el-menu-item
                  index="1-1"
                  @click="() => jumpPath($router, 'examRegistration')"
                  >考试报名</el-menu-item
                >
                <el-sub-menu index="1-2">
                  <template #title>在线考试</template>
                  <el-menu-item
                    index="1-2-1"
                    @click="() => jumpPath($router, 'myExam')"
                    >我的考试</el-menu-item
                  >
                  <el-menu-item
                    index="1-2-2"
                    @click="() => jumpPath($router, 'MyExamRecord')"
                    >考试记录</el-menu-item
                  >
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item
                index="2"
                @click="() => jumpPath($router, 'topicPool')"
              >
                <el-icon
                  ><el-icon
                    ><i class="icon iconfont icon-timujindu"></i></el-icon
                ></el-icon>
                <span>题目池</span>
              </el-menu-item>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon
                    ><i class="icon iconfont icon-kaojuanguanli"></i
                  ></el-icon>
                  <span>考卷管理</span>
                </template>
                <el-menu-item
                  index="3-1"
                  @click="() => jumpPath($router, 'teaTopicPool')"
                  >题目池</el-menu-item
                >
                <el-menu-item
                  index="3-2"
                  @click="() => jumpPath($router, 'quesBank')"
                  >题库管理</el-menu-item
                >
                <el-menu-item
                  index="3-3"
                  @click="() => jumpPath($router, 'question')"
                  >试题管理</el-menu-item
                >
                <el-menu-item
                  index="3-4"
                  @click="() => jumpPath($router, 'paper')"
                  >试卷管理</el-menu-item
                >
                <el-menu-item
                  index="3-5"
                  @click="() => jumpPath($router, 'exam')"
                  >考试管理</el-menu-item
                >
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon
                    ><i class="icon iconfont icon-pingfenbiaozhun"></i
                  ></el-icon>
                  <span>评卷管理</span>
                </template>
                <el-menu-item
                  index="4-1"
                  @click="() => jumpPath($router, 'markPaper')"
                  >卷子</el-menu-item
                >
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><i class="icon iconfont icon-kaoshi"></i></el-icon>
                  <span>审核</span>
                </template>
                <el-sub-menu index="5-1">
                  <template #title>初级审核</template>
                  <el-menu-item
                    index="5-1-1"
                    @click="() => jumpPath($router, 'aduit/junior/quesJunior')"
                    >题目审核</el-menu-item
                  >
                  <el-menu-item
                    index="5-1-2"
                    @click="() => jumpPath($router, 'aduit/junior/paperJunior')"
                    >试卷初审</el-menu-item
                  >
                  <el-menu-item
                    index="5-1-3"
                    @click="() => jumpPath($router, 'aduit/junior/examJunior')"
                    >考试初审</el-menu-item
                  >
                </el-sub-menu>
                <el-sub-menu index="5-2">
                  <template #title>终极审核</template>
                  <el-menu-item
                    index="5-2-1"
                    @click="
                      () => jumpPath($router, 'aduit/ultimate/bankQuesUltimate')
                    "
                    >题库题目审核</el-menu-item
                  >
                  <el-menu-item
                    index="5-2-2"
                    @click="
                      () => jumpPath($router, 'aduit/ultimate/paperUltimate')
                    "
                    >试卷终审</el-menu-item
                  >
                  <el-menu-item
                    index="5-2-3"
                    @click="
                      () => jumpPath($router, 'aduit/ultimate/examUtlimate')
                    "
                    >考试终审</el-menu-item
                  >
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-header class="common-con-header">
          <div class="common-con-header-left">
            <div class="image">
              <img src="../assets/logo.png" alt="" />
            </div>
            ExamPro 在线考试管理系统
          </div>
          <el-popover placement="bottom" :width="200" trigger="click">
            <template #reference>
              <div class="popup">
                <img src="../assets/user.jpg" alt="user" />
              </div>
            </template>
            <PopUp></PopUp>
          </el-popover>
        </el-header>
        <el-main class="common-con-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
