<script setup lang="ts">
import {ref} from 'vue'
import {getCurrentTrackTask} from "@footprint/sdk";

const logs = ref([])

function onClick() {
  const trackTask = getCurrentTrackTask()
  trackTask.trackClick('btn-1', {}, {from: "xxx"})
}

async function fetchLogs() {
  const {data} = await fetch('http://localhost:1546/log/log_record_list')
      .then(response => response.json())
  logs.value = data
}

</script>

<template>
  <button @click="onClick">click me</button>
  <button @click="fetchLogs">fetch logs</button>
  <ul>
    <li v-for="item in logs">{{ JSON.stringify(item) }}</li>
  </ul>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
