<template>
  <el-form label-width="100px">
    <!-- <el-form-item label="页面">
      <el-select multiple v-model="pageEvent.page">
        <el-option
          v-for="item in pageList"
          :key="item.name"
          :label="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="eventType">
      <el-select v-model="modelValue.eventType" placeholder="请选择">
        <el-option value="" label="请选择" />
        <el-option
          v-for="item in EVENT_MAP"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="eventValue">
      <el-input v-model="modelValue.eventValue" />
    </el-form-item>

    <el-form-item label="元数据">
      <meta-list v-model="modelValue.metaList"></meta-list>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="modelValue.comment" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, defineProps } from "vue";
import { useMetaStore } from "../../store/meta";
import metaList from "./metaList.vue";

const metaStore = useMetaStore();
const pageList = metaStore.pageList;
const EVENT_MAP = metaStore.EVENT_MAP;

const $props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// type MetaRow = {
//   field: string;
//   type: string;
//   comment: string;
// };

// type PageEvent = {
//   page: string;
//   eventType: string;
//   eventValue: string;
//   metaList: MetaRow[];
//   comment: string;
//   group: string;
// };

// const pageEvent = reactive<PageEvent>({
//   page: "",
//   eventValue: "",
//   eventType: "",
//   comment: "",
//   group: "",
//   metaList: [] as MetaRow[],
// });
</script>

<style scoped></style>
