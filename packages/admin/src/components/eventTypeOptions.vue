<template>
  <el-option
      v-for="item in EVENT_MAP"
      :key="item.value"
      :label="item.name"
      :value="item.value"
  />
</template>

<script setup lang="ts">
import {EVENT_TYPE} from '@footprintjs/sdk'

const EVENT_MAP = Object.freeze({
  [EVENT_TYPE.pv]: {
    name: '访问',
    value: EVENT_TYPE.pv,
    cls: 'success'
  },
  [EVENT_TYPE.click]: {
    name: '点击',
    value: EVENT_TYPE.click,
    cls: 'danger'
  },
  [EVENT_TYPE.duration]: {
    name: '页面停留',
    value: EVENT_TYPE.duration,
    cls: 'warning'
  },
  [EVENT_TYPE.exposure]: {
    name: '曝光',
    value: EVENT_TYPE.exposure,
    cls: 'info'
  },
  [EVENT_TYPE.logic]: {
    name: '逻辑埋点',
    value: EVENT_TYPE.logic,
    cls: ''
  }
})
</script>

<style scoped>

</style>
