<template>
  <el-form label-width="100px">
    <el-form-item label="名称">
      <el-input v-model="currentPage.name" />
    </el-form-item>
    <el-form-item label="value">
      <el-input v-model="currentPage.value" />
    </el-form-item>
    <el-form-item label="公共参数">
      <meta-list v-model="currentPage.commonParams"> </meta-list>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import metaList from "./metaList.vue";
import { useMetaStore } from "../../store/meta";
import { IPage } from "../../typings";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const $route = useRoute();
const $rotuer = useRouter();
const metaStore = useMetaStore();

const currentPage = reactive<IPage>({
  id: "",
  name: "",
  value: "",
  commonParams: [],
});

async function submit() {
  await metaStore.savePageDetail(currentPage);
  ElMessage.success("操作成功");
  $rotuer.back();
}

async function fetchDetail() {
  const id = $route.query.id;
  if (id) {
    const data = await metaStore.fetchPageDetail(id as string);
    if (data) {
      Object.assign(currentPage, data);
    }
  }
}
onMounted(() => {
  fetchDetail();
});
</script>

<style scoped lang="scss">
::v-deep {
  .el-form-item .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
