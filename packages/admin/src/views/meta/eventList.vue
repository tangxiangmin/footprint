<template>
  <el-form inline>
    <el-form-item>
      <el-button @click="addRow"> 添加 </el-button>
    </el-form-item>
  </el-form>
  <el-table border>
    <el-table-column label="id" prop="id" />
    <el-table-column label="page" prop="page" />
    <el-table-column label="eventType" prop="eventType" />
    <el-table-column label="eventValue" prop="eventValue" />
  </el-table>
</template>
<script setup lang="ts">
function addRow() {}
</script>
