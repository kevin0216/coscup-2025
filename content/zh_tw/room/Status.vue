<script setup>
const props = defineProps({
  data: Object,
  currentTime: Date,
})

function getProgress(startTime, endTime) {
  const start = new Date(startTime)
  const end = new Date(endTime)

  const total = end - start
  const passed = props.currentTime - start
  return Math.round((passed / total) * 100)
}

function formatTime(time) {
  const d = new Date(time)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="status">
    <div
      class="progress-bar"
      :style="{ width: `${getProgress(props.data.start, props.data.end)}%` }"
    />
    <p class="start">
      {{ formatTime(props.data.start) }}
    </p>
    <p class="title">
      {{ props.data.title }}
    </p>
    <p class="end">
      {{ formatTime(props.data.end) }}
    </p>
  </div>
</template>

<style scoped>
.status {
  display: flex;
  position: relative;
  padding: 8px 16px;
}
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--vp-c-default-soft);
  height: 100%;
}
p {
  margin: 0;
}
.start {
  flex: 1;
  text-align: left;
}
.title {
  flex: 8;
  text-align: center;
}
.end {
  flex: 1;
  text-align: right;
}
</style>
