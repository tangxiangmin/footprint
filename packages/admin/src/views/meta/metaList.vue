<template>
  <el-table :data="modelValue" border>
    <el-table-column label="字段">
      <template v-slot:default="{ row }">
        <el-input v-model="row.field" :disabled="disabled"/>
      </template>
    </el-table-column>
    <el-table-column label="类型">
      <template v-slot:default="{ row }">
        <el-select v-model="row.type" :disabled="disabled">
          <el-option value="number" label="数字"/>
          <el-option value="string" label="字符串"/>
          <el-option value="boolean" label="布尔值"/>
          <el-option value="date" label="日期"/>
          <el-option value="timestamp" label="时间戳"/>
          <el-option value="enum" label="枚举值"/>
          <el-option value="json" label="json"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="备注">
      <template v-slot:default="{ row }">
        <el-input v-model="row.comment" :disabled="disabled"/>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{ row }">
        <el-button type="text" @click="removeMetaRow(row)" :disabled="disabled">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="mt-20px">
    <el-button @click="addMetaRow" :disabled="disabled">增加一行</el-button>
  </div>
</template>
<script setup lang="ts">
import {IMetaRow} from "../../typings";

const $props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

function addMetaRow() {
  $props.modelValue.push({
    field: "",
    type: "string",
    comment: "",
  });
}

function removeMetaRow(row: IMetaRow) {
  let idx = $props.modelValue.indexOf(row);
  if (idx > -1) {
    $props.modelValue.splice(idx, 1);
  }
}
</script>
