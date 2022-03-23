<template>
  <el-table :data="modelValue" border>
    <el-table-column label="字段">
      <template v-slot:default="{ row }">
        <el-input v-model="row.field" />
      </template>
    </el-table-column>
    <el-table-column label="类型">
      <template v-slot:default="{ row }">
        <el-select v-model="row.type">
          <el-option value="number" label="数字" />
          <el-option value="string" label="字符串" />
          <el-option value="boolean" label="布尔值" />
          <el-option value="date" label="日期" />
          <el-option value="timestamp" label="时间戳" />
          <el-option value="json" label="json" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="备注">
      <template v-slot:default="{ row }">
        <el-input v-model="row.comment" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default>
        <el-button type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="mt-20px">
    <el-button @click="addMetaRow">增加一行</el-button>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineProps, defineEmits } from "vue";

type Meta = {
  field: string;
  type: string;
  comment: string;
};

const $props =defineProps({
  modelValue: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

let $emits = defineEmits(["input"]);

function addMetaRow() {
  $props.modelValue.push({
    field: "",
    type: "string",
    comment: "",
  });
}
</script>
