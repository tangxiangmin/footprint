<template>
  <el-form label-width="100px">
    <el-form-item label="页面">
      <el-select multiple v-model="trackEvent.pages">
        <el-option
          v-for="item in pageList"
          :key="item.name"
          :label="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <event-config :modelValue="trackEvent"> </event-config>
    <el-form-item>
      <el-button @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { ElMessage } from "element-plus";

import eventConfig from "./eventConfig.vue";
import { useMetaStore } from "../../store/meta";
import {ITrackEvent, ITrackEventTemplate} from "../../typings";
import {useRoute, useRouter} from "vue-router";

const metaStore = useMetaStore();
const pageList = metaStore.pageList;

const $route = useRoute();

const trackEvent = ref<ITrackEventTemplate>({
  id: "",
  name: "",
  pages: [],
  eventType: 1,
  eventValue: "",
  commonParams: [],
});

async function fetchDetail() {
  const id = $route.query.id;
  if (id) {
    const data = await metaStore.fetchEventTemplateDetail(id as string);
    if (data) {
      trackEvent.value = data;
    }
  }
}

onMounted(() => {
  fetchDetail();
});

async function submit() {

  await metaStore.saveEventTemplate(trackEvent.value)

  // await metaStore.createPageEvent(trackEvent.value.pages, trackEvent.value as unknown as ITrackEvent);

  ElMessage.success("操作成功");
}
</script>

<style scoped></style>
