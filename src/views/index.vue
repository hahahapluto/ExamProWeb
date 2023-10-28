<script lang="ts" setup>
import { ElPopover } from "element-plus";
import { ref } from "vue";
import PopUp from "../component/index/popUp.vue";
import { jumpPath, sessionGetData } from "../hooks/useStorage";
import "../sass/index/index.scss";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

let curRole = ref(1);
curRole.value = sessionGetData("role");
console.log(curRole);
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
            <!-- 考试 -->
              <el-sub-menu index="1" v-if="curRole == 4">
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
              <!-- 题目池 -->
              <el-menu-item
                index="2"
                @click="() => jumpPath($router, 'topicPool')"
              v-if="curRole != 3 && curRole != 5">
                <el-icon
                  ><el-icon
                    ><i class="icon iconfont icon-timujindu"></i></el-icon
                ></el-icon>
                <span>题目池</span>
              </el-menu-item>
              <!-- 考卷管理 -->
              <el-sub-menu index="3" v-if="curRole == 3 || curRole == 5">
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
                  v-if="curRole == 3"
                  >考试管理</el-menu-item
                >
              </el-sub-menu>
              <!-- 评卷管理 -->
              <el-sub-menu index="4" v-if="curRole == 3">
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
              <!-- 审核 -->
              <el-sub-menu index="5" v-if="curRole == 1 || curRole == 2">
                <template #title>
                  <el-icon><i class="icon iconfont icon-kaoshi"></i></el-icon>
                  <span>审核</span>
                </template>
                <el-sub-menu index="5-1" v-if="curRole == 1">
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
                <el-sub-menu index="5-2" v-if="curRole == 2">
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
              <!-- 监考管理 -->
              <el-sub-menu index="6" v-if="curRole == 6">
                <template #title>
                  <el-icon><i class="icon iconfont icon-kaoshi"></i></el-icon>
                  <span>监考管理</span>
                </template>
                <el-menu-item
                  index="6-1"
                  @click="() => jumpPath($router, 'invigilate')"
                  >监考列表</el-menu-item
                >
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
