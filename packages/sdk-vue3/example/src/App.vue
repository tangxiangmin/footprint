<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute} from "vue-router";

const route = useRoute()
const routerKey = computed(() => {
  return route.fullPath
})

</script>

<template>
  <ul>
    <li>
      <router-link :to="{name:'index'}">index</router-link>
    </li>
    <li>
      <router-link :to="{name:'list'}">list</router-link>
    </li>
    <li>
      <router-link :to="{name:'detailPage',params:{id:1}}">detail 1</router-link>
    </li>
    <li>
      <router-link :to="{name:'detailPage',params:{id:2}}">detail 2</router-link>
    </li>
  </ul>
  <router-view :key="routerKey"></router-view>

</template>

<style>

</style>
