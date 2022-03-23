<template>
  <el-form inline>
    <el-form-item>
      <el-button @click="addRow">新增页面</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="pageList">
    <el-table-column label="id" prop="id" />
    <el-table-column label="name" prop="name" />
    <el-table-column label="value" prop="value" />
    <el-table-column label="操作">
      <template v-slot:default="{ row }">
        <el-button size="small" @click="editRow(row)">编辑</el-button>
        <el-button size="small" @click="removeRow(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMetaStore } from "../../store/meta";

import { IPage } from "../../typings";

const router = useRouter();
const metaStore = useMetaStore();
const pageList = metaStore.pageList;

function addRow() {
  router.push({
    name: "page",
  });
}

function editRow(row: IPage) {
  router.push({
    name: "page",
    query: {
      id: row.id,
    },
  });
}

function removeRow(row: IPage) {
  metaStore.removePage(row);
}
</script>

<style scoped></style>
