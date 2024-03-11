<template>
  <el-form inline>
    <el-form-item>
      <el-button type="primary" @click="onAddClick">新建</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="list">
    <el-table-column label="id" prop="_id" />
    <el-table-column label="名称" prop="name" />
    <el-table-column label="utmSource" prop="utmSource" />
    <el-table-column label="utmCampaign" prop="utmCampaign" />
    <el-table-column label="操作">
      <template v-slot:default="{ row }">
        <el-button size="small" @click="onEditClick(row)">编辑</el-button>
        <el-button size="small" @click="onRemoveClick(row)">删除</el-button>
        <el-button size="small" @click="createLink(row)">生成链接</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="mt-10 flex justify-center">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="page"
      :total="total"
      :page-size="pageSize"
      @size-change="changeSize"
      @current-change="changeCurrent"
    ></el-pagination>
  </div>
  <el-dialog v-model="formDialogVisible" :title="currentRow.id ? '编辑' : '创建'">
    <el-form label-width="120px">
      <el-form-item label="name">
        <el-input v-model="currentRow.name"></el-input>
      </el-form-item>
      <el-form-item label="utm_source">
        <el-input v-model="currentRow.utmSource"></el-input>
      </el-form-item>
      <el-form-item label="utm_campaign">
        <el-input v-model="currentRow.utmCampaign"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onDialogSaveClick" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="linkDialogVisible" title="创建链接">
    <el-form label-width="120px">
      <el-form-item label="原始链接">
        <el-input v-model="linkForm.rawLink"></el-input>
      </el-form-item>
      <el-form-item label="生成链接">
        <el-input v-model="resultLink"></el-input>
        <div class="mt-10px">该链接可用于外部投放</div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'

import { IPage, ITraceParams } from '../../typings'
import {
  getTraceParams,
  addTraceParams,
  updateTraceParams,
  removeTraceParams,
} from '../../api/meta'

import { useCurd } from '../../utils/curd'
import { computed, ref } from 'vue'

const router = useRouter()

function createTemplateRow(): ITraceParams {
  return {
    name: '',
    utmSource: '',
    utmCampaign: '',
  }
}

function isTemplateRow(row: ITraceParams): boolean {
  return !!row._id
}

const curdApi = {
  getList: (params: { page: number; pageSize: number }) => {
    return getTraceParams(params).then((res) => res.data)
  },
  edit: updateTraceParams,
  add: addTraceParams,
  remove: (row: ITraceParams) => {
    if (row._id) {
      return removeTraceParams(row._id)
    }
    return Promise.resolve(false)
  },
}

const {
  list,
  page,
  pageSize,
  total,
  changeSize,
  changeCurrent,
  currentRow,
  formDialogVisible,
  getList,
  onAddClick,
  onEditClick,
  onRemoveClick,
  onDialogSaveClick,
} = useCurd<ITraceParams>({
  api: curdApi,
  createTemplateRow,
  isTemplateRow,
})

const [linkDialogVisible, toggleDialogVisible] = useToggle()
const linkForm = ref({
  rawLink: '',
})
const resultLink = computed(() => {
  const url = linkForm.value.rawLink
  const join = url.includes('?') ? '&' : '?'
  const { utmSource, utmCampaign } = currentRow.value

  return `${url}${join}utm_source=${utmSource}&utm_campaign=${utmCampaign}`
})

function createLink(row: ITraceParams) {
  currentRow.value = row
  toggleDialogVisible()
}
</script>

<style scoped></style>
