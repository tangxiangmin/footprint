<template>

  <div>
    <h1>detail {{ id }}</h1>
    <h2>scroll exposure event</h2>
    <div class="scroll">
      <div class="scroll-item" v-for="item in 10" v-log.exposure.once="{key:'some-img', extra:{no:item}}"></div>
    </div>
    <h2>click event</h2>
    <button v-log.click="{key:'btn'}">click me</button>
  </div>
</template>

<script>
import {getCurrentTrackTask} from "../../../src";

export default {
  name: "detail",
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    const trackTask = getCurrentTrackTask()
    trackTask.setCommonExtra({id: this.id})
  },
}
</script>

<style scoped lang="scss">
.scroll {
  white-space: nowrap;
  overflow: auto;
  font-size: 0;
  width: 300px;

  &-item {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: #ccc;
    margin: 0 10px;
  }
}
</style>
