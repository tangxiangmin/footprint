<template>
  <el-form label-width="100px">
    <el-form-item label="名称">
      <el-input v-model="currentPage.name"/>
    </el-form-item>
    <el-form-item label="value">
      <el-input v-model="currentPage.value"/>
    </el-form-item>
    <el-form-item label="公共参数">
      <meta-list v-model="currentPage.commonParams"></meta-list>
    </el-form-item>
    <el-form-item label="事件列表">
      <el-row :gutter="20" style="width: 100%">
        <el-col :xs="12" :sm="8" v-for="item in currentPage.eventList">
          <div class="p-20px mb-20px shadow">
            <event-config :modelValue="item" :disabled="item.readonly"></event-config>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button @click="addPageEvent">增加事件</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref, onMounted, computed} from "vue";
import metaList from "./metaList.vue";
import eventConfig from "./eventConfig.vue";

import {useMetaStore} from "../../store/meta";
import {IPage, ITrackEvent} from "../../typings";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const $route = useRoute();
const $router = useRouter();
const metaStore = useMetaStore();

const currentPage = ref<IPage>({
  _id: '',
  name: "",
  value: "",
  commonParams: [],
  eventList: [],
});

function createTempEvent(): ITrackEvent {
  return {
    id: "",
    page: "",
    name: "",
    eventType: 1,
    eventValue: "",
    commonParams: [],
  };
}

async function submit() {
  await metaStore.savePageDetail(currentPage.value);
  ElMessage.success("操作成功");
  $router.back();
}

async function fetchDetail() {
  const id = $route.query.id;
  if (id) {
    const data = await metaStore.fetchPageDetail(id as string);
    if (data) {
      currentPage.value = data;
    }
  }
}

async function addPageEvent() {
  currentPage.value.eventList.push(createTempEvent());
}

onMounted(() => {
  fetchDetail();
});
</script>

<style scoped lang="scss">
:deep {
  .el-form-item .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
