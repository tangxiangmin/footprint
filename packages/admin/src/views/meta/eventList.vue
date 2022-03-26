<template>
  <el-form inline>
    <el-form-item>
      <el-button @click="addEvent">新增事件</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="eventTemplateList">
    <el-table-column label="id" prop="_id"/>
    <el-table-column label="事件名称" prop="name"/>
    <el-table-column label="事件类型" prop="eventType"/>
    <el-table-column label="事件key" prop="eventValue"/>
    <el-table-column label="页面列表">
      <template v-slot:default="{ row }">
        <el-tag v-for="(item, index) in row.pages" class="tag-event">
          【{{ item }}】
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{ row }">
        <el-button size="small" @click="editEvent(row)">编辑</el-button>
        <el-button size="small" @click="removeEvent(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useMetaStore} from "../../store/meta";

import {ITrackEventTemplate} from "../../typings";
import {computed, onMounted} from "vue";

const router = useRouter();
const metaStore = useMetaStore();

const eventTemplateList = computed(()=>{
  return metaStore.eventTemplateList;
})

onMounted(()=>{
  metaStore.fetchEventTemplateList()
})

function editEvent(row: ITrackEventTemplate) {
  router.push({
    name: "event",
    query: {
      id: row._id
    }
  });
}

function removeEvent(row:ITrackEventTemplate) {
  metaStore.removeEventTemplate(row)
}

function addEvent() {
  router.push({
    name: "event",
  });
}
</script>

<style scoped></style>
