<script setup lang="ts">

import {getCurrentTrackTask} from "@footprint/sdk";

function onClick() {
  console.log('click me')
  const trackTask = getCurrentTrackTask()
  trackTask.trackClick('btn-1', {}, {from: "xxx"})
}

</script>

<template>
  <button @click="onClick">click me</button>
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
