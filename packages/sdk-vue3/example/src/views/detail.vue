<template>
  <h1>
    detail {{ id }}
  </h1>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {computed} from "vue";
import {useTrackTask} from "@footprintjs/sdk-vue3";

const route = useRoute()

const id = computed(() => {
  return route.params.id || ''
})

useTrackTask({}, {id: id.value})

</script>

<style scoped>

</style>
