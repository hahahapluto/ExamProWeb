<template>
  <div class="showTable">
    <el-table :data="usersData" style="width: 100%">
      <el-table-column label="考生id" prop="userid" />
      <el-table-column label="考生姓名" prop="username" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row,$router)" type="success" plain>评卷</el-button>
          <!-- <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getExamRegistUsers } from '../../request/api/exam/examRegistration';
import pinia from '../../stores';
import paperStore from '../../stores/paperStore';

const paperData = paperStore(pinia)

let usersData: any = ref()
//获取试卷信息
const getusersrData = async () => {
  usersData.value = (await getExamRegistUsers(paperData.scoreExamId)).data.data
  console.log(usersData)
}
onMounted(() => {
  getusersrData()
})
console.log(paperData.paperId)
interface User {
  userid: number
  username: string
}

const handleEdit = (index: Number, row: User,$router:any) => {
  console.log(index, row)
  console.log(row.userid);
  // 跳转时
  paperData.scoreUserId = row.userid
  $router.push("/index/giveScore");
}
// const handleDelete = (index: number, row: User) => {
//   console.log(index, row)
// }
</script>
