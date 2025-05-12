<script>
export default {
  props: {
    data: { required: true, type: Object },
    currentTime: { required: true, type: Date },
  },
  methods: {
    getProgress(startTime, endTime) {
      const start = new Date(startTime)
      const end = new Date(endTime)

      const total = end - start
      const passed = this.currentTime - start
      return Math.round((passed / total) * 100)
    },
    formatTime(time) {
      const d = new Date(time)
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    },
  },
}
</script>

<template>
  <div class="status">
    <div
      class="progress-bar"
      :style="{ width: `${getProgress(data.start, data.end)}%` }"
    />
    <p class="start">
      {{ formatTime(data.start) }}
    </p>
    <p class="title">
      {{ data.title }}
    </p>
    <p class="end">
      {{ formatTime(data.end) }}
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
  background-color: rgb(0, 0, 0, 0.05);
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
