<template>
  <el-form-item label="名称">
    <el-input v-model="modelValue.name" :disabled="disabled"/>
  </el-form-item>
  <el-form-item label="eventType">
    <el-select v-model="modelValue.eventType" placeholder="请选择" :disabled="disabled">
      <el-option value="" label="请选择"/>
      <event-type-options></event-type-options>
    </el-select>
  </el-form-item>
  <el-form-item label="eventValue">
    <el-input v-model="modelValue.eventValue" :disabled="disabled"/>
  </el-form-item>
  <el-form-item label="元数据">
    <meta-list v-model="modelValue.commonParams" :disabled="disabled"></meta-list>
  </el-form-item>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {ITrackEvent} from "../../typings";
import eventTypeOptions from '../../components/eventTypeOptions.vue'
import metaList from "./metaList.vue";

const $props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<ITrackEvent>,
    default: () => {
      return {
        id: "",
        name: "",
        page: "",
        eventType: 1,
        eventValue: "",
        commonParams: [],
      };
    },
  },
});
</script>

<style scoped></style>
