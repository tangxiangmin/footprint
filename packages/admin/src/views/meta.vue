<template>
  <div class="p-20px">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="showDialog">增加</el-button>
      </el-form-item>
      <el-form-item label="页面">
        <el-input/>
      </el-form-item>
      <el-form-item label="事件类型">
        <el-input/>
      </el-form-item>
    </el-form>

    <el-table border>
      <el-table-column label="id" prop="id"/>
      <el-table-column label="页面" prop="page"/>
      <el-table-column label="eventValue" prop="id"/>
    </el-table>
    <el-dialog v-model="dialogVisible" title="编辑" width="50%">
      <el-form label-width="100px">
        <el-form-item label="页面">
          <el-select multiple v-model="pageEvent.page">
            <el-option
                v-for="item in pageList"
                :key="item.name"
                :label="item.value"
                :value="item.value"
            ></el-option>
          </el-select>
          <div class="ml-20px">
            <el-button type="text" class="ml-20px">新增页面</el-button>
          </div>
        </el-form-item>
        <el-form-item label="eventType">
          <el-select v-model="pageEvent.eventType" placeholder="请选择">
            <el-option value="" label="请选择"/>
            <el-option
                v-for="item in EVENT_MAP"
                :key="item.value"
                :label="item.name"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="eventValue">
          <el-input v-model="pageEvent.eventValue"/>
        </el-form-item>
        <el-form-item label="分组">
          <el-input v-model="pageEvent.group"/>
        </el-form-item>
        <el-form-item label="元数据">
          <el-table :data="pageEvent.metaList" border>
            <el-table-column label="字段">
              <template v-slot:default="{ row }">
                <el-input v-model="row.field"/>
              </template>
            </el-table-column>
            <el-table-column label="类型">
              <template v-slot:default="{ row }">
                <el-select v-model="row.type">
                  <el-option value="number" label="数字"/>
                  <el-option value="string" label="字符串"/>
                  <el-option value="boolean" label="布尔值"/>
                  <el-option value="date" label="日期"/>
                  <el-option value="timestamp" label="时间戳"/>
                  <el-option value="json" label="json"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template v-slot:default="{ row }">
                <el-input v-model="row.comment"/>
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
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="pageEvent.comment"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePageEvent">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useMetaStore} from "../store/meta";

const dialogVisible = ref(false);

const metaStore = useMetaStore();
const pageList = metaStore.pageList;
const EVENT_MAP = metaStore.EVENT_MAP;

type MetaRow = {
  field: string;
  type: string;
  comment: string;
};
type PageEvent = {
  page: string
  eventType: string;
  eventValue: string;
  metaList: MetaRow[];
  comment: string,
  group: string,
}

const pageEvent = reactive<PageEvent>({
  page: '',
  eventValue: '',
  eventType: '',
  comment: '',
  group: '',
  metaList: [] as MetaRow[],
})

function showDialog() {
  dialogVisible.value = true;
}

function addMetaRow() {
  pageEvent.metaList.push({
    field: "",
    comment: "",
    type: "string",
  });
}

function savePageEvent() {
  console.log(pageEvent)
}
</script>

<style scoped></style>
