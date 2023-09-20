<script lang="ts" setup>
import '../sass/index/index.scss'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const change=function(){
  this.$router.push("/login");
}
</script>

<template>
  <div class="common">
    <el-container class="common-con">
      <el-header class="common-con-header">
        <div class="image">
          <img src="../assets/logo.png" alt="">
        </div>
        ExamPro 在线考试管理系统
      </el-header>
      <el-container>
        <el-aside class="common-con-aside">
          <el-row class="tac">
            <!-- <el-col :span="12">
              <h5 class="mb-2">Default colors</h5>
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon><document /></el-icon>
                  <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon><setting /></el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
              </el-menu>
            </el-col> -->
            <el-col>
              <!-- <h5 class="mb-2">Custom colors</h5> -->
              <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                  <!-- h1 -->
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>考试</span>
                  </template>
                    <el-menu-item index="1-1" @click="change">考试报名</el-menu-item>
                  <el-sub-menu index="1-2">
                    <template #title>在线考试</template>
                    <el-menu-item index="1-2-1">我的考试</el-menu-item>
                    <el-menu-item index="1-2-2">考试记录</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>题目池</span>
                </el-menu-item>
                <el-sub-menu index="3">
                  <!-- h1 -->
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>考卷管理</span>
                  </template>
                  <!-- <el-menu-item-group title="考题管理"> -->
                    <el-menu-item index="3-1">题目池</el-menu-item>
                    <el-menu-item index="3-2">题库管理</el-menu-item>
                    <el-menu-item index="3-3">试题管理</el-menu-item>
                  <!-- </el-menu-item-group> -->
                  <!-- <el-menu-item-group title="试卷管理"> -->
                    <el-menu-item index="3-4">试卷管理</el-menu-item>
                  <!-- </el-menu-item-group> -->
                </el-sub-menu>
                <el-sub-menu index="4">
                  <!-- h1 -->
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>评卷管理</span>
                  </template>
                  <el-menu-item index="4-1">卷子</el-menu-item>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="common-con-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
