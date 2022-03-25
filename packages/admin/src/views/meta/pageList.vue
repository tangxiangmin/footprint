<template>
  <el-form inline>
    <el-form-item>
      <el-button @click="addPage">新增页面</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="pageList">
    <el-table-column label="id" prop="id" />
    <el-table-column label="页面名称" prop="name" />
    <el-table-column label="页面key" prop="value" />
    <el-table-column label="事件列表">
      <template v-slot:default="{ row }">
        <el-tag v-for="(item, index) in row.eventList" class="tag-event">
          {{ item.name || "默认" }}
          <span v-if="item.eventValue">【{{ item.eventValue }}】</span>
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{ row }">
        <el-button size="small" @click="editPage(row)">编辑</el-button>
        <el-button size="small" @click="removePage(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMetaStore } from "../../store/meta";

import { IPage } from "../../typings";
import {computed, onMounted} from "vue";

const router = useRouter();
const metaStore = useMetaStore();

const pageList = computed(()=>{
  return metaStore.pageList
});


onMounted(()=>{
  metaStore.fetchPageList()
})

function addPage() {
  router.push({
    name: "page",
  });
}

function editPage(row: IPage) {
  router.push({
    name: "page",
    query: {
      id: row.id,
    },
  });
}

function removePage(row: IPage) {
  metaStore.removePage(row);
}
</script>

<style scoped></style>
