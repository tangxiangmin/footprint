<template>
  <div class="flex">
    <div class="side w-200px">
      <el-menu default-active="2" class="el-menu-vertical-demo h-100vh">
        <el-menu-item index="2">
          <template #title>
            <router-link :to="{ name: 'home' }">页面列表</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link :to="{ name: 'eventList' }">事件列表</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main flex-grow p-20px">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style></style>
