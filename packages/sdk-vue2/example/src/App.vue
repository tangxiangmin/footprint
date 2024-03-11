<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'index' }">index</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'list' }">list</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'detailPage', params: { id: 1 } }">detail 1</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'detailPage', params: { id: 2 } }">detail 2</router-link>
      </li>
    </ul>
    <router-view :key="routerKey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App.vue',
  computed: {
    routerKey() {
      return this.$route.fullPath
    },
  },
}
</script>

<style scoped></style>
