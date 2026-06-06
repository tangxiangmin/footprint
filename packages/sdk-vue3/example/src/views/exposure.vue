<template>
  <div class="exposure-demo">
    <h1>曝光（exposure）验证</h1>
    <p class="tip">
      向下滚动。每个卡片用 <code>v-log.exposure</code> 绑定，元素进入视口（≥20% 可见并停留 100ms）即上报。
      右下角面板实时显示曝光记录，控制台也会打印 <code>send log</code>。
    </p>

    <!-- 顶部留白，保证初始时下方卡片都在视口外 -->
    <div class="spacer">↓ 向下滚动查看卡片曝光 ↓</div>

    <div
      v-for="card in cards"
      :key="card.key"
      class="card"
      :class="{ seen: exposedKeys.has(card.key) }"
      v-log.exposure="{ key: card.key, extend: { index: card.index }, extra: { title: card.title } }"
    >
      <div class="card-title">{{ card.title }}</div>
      <div class="card-key">key: {{ card.key }}</div>
      <div class="card-state">{{ exposedKeys.has(card.key) ? '✅ 已曝光上报' : '⏳ 等待进入视口' }}</div>
    </div>

    <div class="spacer">— 到底了 —</div>

    <!-- 实时曝光记录面板 -->
    <div class="panel">
      <div class="panel-title">曝光上报记录 ({{ logs.length }})</div>
      <div v-if="!logs.length" class="panel-empty">暂无，滚动卡片进入视口试试</div>
      <ul>
        <li v-for="(item, i) in logs" :key="i">
          <b>{{ item.eventValue }}</b>
          <span>{{ item.extra }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTrackTask } from '@footprintjs/sdk-vue3'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

useTrackTask()

// EVENT_TYPE.exposure === 4
const EXPOSURE = 4

const cards = Array.from({ length: 10 }, (_, i) => ({
  index: i + 1,
  key: `exposure-card-${i + 1}`,
  title: `卡片 ${i + 1}`,
}))

const logs = ref<any[]>([])
const exposedKeys = reactive(new Set<string>())

function onLog(e: Event) {
  const data = (e as CustomEvent).detail
  if (data?.eventType === EXPOSURE) {
    logs.value.unshift(data)
    exposedKeys.add(data.eventValue)
  }
}

onMounted(() => window.addEventListener('footprint-log', onLog))
onUnmounted(() => window.removeEventListener('footprint-log', onLog))
</script>

<style scoped>
.exposure-demo {
  max-width: 640px;
  margin: 0 auto;
  padding: 16px;
}
.tip {
  color: #555;
  line-height: 1.6;
}
code {
  background: #f2f2f2;
  padding: 1px 4px;
  border-radius: 3px;
}
.spacer {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  border: 1px dashed #ddd;
  margin: 24px 0;
}
.card {
  height: 160px;
  /* 卡片间隔近一屏：滚动时一次大致只露一个，自然停留 >100ms，避免快速滚动划过被清除计时器 */
  margin: 45vh 0;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #fafafa;
  transition: all 0.3s;
}
.card.seen {
  border-color: #2ecc71;
  background: #eafff1;
}
.card-title {
  font-size: 20px;
  font-weight: bold;
}
.card-key {
  color: #888;
  font-size: 13px;
}
.panel {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 260px;
  max-height: 50vh;
  overflow: auto;
  background: #1e1e1e;
  color: #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
.panel-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.panel-empty {
  color: #888;
}
.panel ul {
  margin: 0;
  padding-left: 16px;
}
.panel li {
  margin-bottom: 6px;
  word-break: break-all;
}
.panel li b {
  color: #2ecc71;
}
.panel li span {
  display: block;
  color: #999;
}
</style>
