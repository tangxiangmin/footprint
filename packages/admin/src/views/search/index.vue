<template>
  <el-form ref="searchForm" :model="params" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="查询时间" prop="dateRange">
          <el-date-picker
              v-model="params.dateRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="页面名称">
          <el-select v-model="params.page">
            <el-option
                v-for="item in pageList"
                :key="item.name"
                :label="item.value"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事件类型">
          <el-select v-model="params.eventType" placeholder="请选择">
            <el-option :value="0" label="请选择"/>
            <event-type-options></event-type-options>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事件value">
          <el-select v-model="params.eventValue" placeholder="请选择">
            <el-option value="" label="请选择"/>
            <el-option v-for="item in currentEventList" :label="`${item.name}【${item.eventValue}】`"
                       :value="item.eventValue"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="系统类型">
          <el-select v-model="params.osType" placeholder="请选择">
            <el-option value="" label="请选择"/>
            <el-option label="iOS" value="iOS"/>
            <el-option label="Android" value="Android"/>
            <el-option label="PC" value="pc"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="应用类型">
          <el-select v-model="params.clientTypeList" multiple placeholder="请选择">
            <el-option-group>
              <el-option value="" label="请选择"/>
            </el-option-group>
            <el-option-group>
              <el-option label="mobile站" value="mobile"/>
              <el-option label="pc站" value="pc"/>
              <el-option label="微信小程序" value="wx_mini"/>
            </el-option-group>
            <el-option-group>
              <el-option label="安卓客户端" value="android_app"/>
              <el-option label="iOS客户端" value="ios_app"/>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="应用版本">
          <el-input v-model="params.clientVersion" type="text"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="页面来源">
          <el-input v-model="params.utm" type="text"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="来源位置">
          <el-input v-model="params.source" type="text"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <!--元数据查询-->
      <el-col :span="8" v-for="meta in currentMetaList">
        <el-form-item :label="`${meta.field}`">
          <el-input v-model="params.extraObj[meta.field]" :placeholder="meta.type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item>
        <el-button v-loading="isLoading" type="primary" @click="search">
          点击查询
        </el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {useMetaStore} from "../../store/meta";
import {IMetaRow} from "../../typings";
import eventTypeOptions from '../../components/eventTypeOptions.vue'


const metaStore = useMetaStore()

const isLoading = ref<boolean>(false)

const pageList = computed(() => {
  return metaStore.pageList
})

const currentPage = computed(() => {
  return pageList.value.find(row => row.value === params.page)
})

const currentEventList = computed(() => {
  if (!currentPage.value) return []

  return currentPage.value.eventList.filter(event => {
    let flag = true
    if (params.eventType !== 0) {
      flag = flag && event.eventType === params.eventType
    }
    return flag
  })
})

const currentEvent = computed(() => {
  if (!Array.isArray(currentEventList.value)) return null
  return currentEventList.value.find(event => event.eventValue === params.eventValue)
})

const currentMetaList = computed(() => {
  let params: IMetaRow[] = []
  // 当前页面公共参数，拼接当前事件的公共参数
  if (currentPage.value) {
    params = params.concat(currentPage.value.commonParams)
  }
  if (currentEvent.value) {
    params = params.concat(currentEvent.value.commonParams)
  }
  return params
})

onMounted(() => {
  metaStore.fetchPageList()
})

const params = reactive({
  page: '',
  eventType: 0,
  eventValue: '',
  dateRange: [],
  osType: '',
  clientTypeList: [],
  clientVersion: '',
  utm: '',
  source: '',

  extraObj: {},
})

// todo 查询接口
async function search() {
  if (isLoading.value) return
  isLoading.value = true

  console.log(params)

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}
</script>
