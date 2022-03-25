<template>
  <div class="flex">
    <div class="side flex-shrink-0">
      <el-menu :default-active="currentIndex" class="el-menu-vertical-demo h-100vh">
        <el-menu-item :index="menu.index" v-for="menu in menuList">
          <router-link class="block w-200px" :to="menu.route">{{ menu.title }}</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main flex-grow p-20px">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useRoute} from "vue-router";
import {computed} from "vue";

const menuList = [
  {
    route: {name: 'home'},
    title: '页面列表',
    index: 2
  },
  {
    route: {name: 'eventList'},
    title: '模板事件列表',
    index: 3
  },
  {
    route: {name: 'search'},
    title: '查询',
    index: 4
  }
]
const route = useRoute()

const currentIndex = computed(() => {
  const menu = menuList.find(menu => menu.route.name === route.name)
  return menu && menu.index
})

</script>

<style></style>
