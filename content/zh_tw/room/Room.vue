<script setup>
import { computed, onMounted, ref } from 'vue'
import Status from './Status.vue'

const sessions = ref([])
const session_types = ref([])
const rooms = ref([])
const testMode = ref(false)
const currentTime = ref(new Date())
const timer = ref(null)
const crowd = ref([])

const roomStatus = computed(() => {
  return rooms.value.map((room) => {
    const roomSessions = sessions.value[room]
    const now = currentTime.value

    const currentSession = roomSessions.find((session) => {
      const start = new Date(session.start)
      const end = new Date(session.end)
      return start <= now && now <= end
    })

    if (currentSession) {
      return {
        room,
        course: {
          title: currentSession.zh.title,
          start: currentSession.start,
          end: currentSession.end,
          uri: currentSession.uri,
        },
        type: currentSession.type,
      }
    }

    // no currentSession => find nextSession

    const nextSession = roomSessions.find((session) => new Date(session.start) > now)
    if (nextSession) {
      const nextSessionStart = new Date(nextSession.start)
      if (nextSessionStart.getDate() === now.getDate()) {
        return {
          room,
          course: `下一場 ${nextSession.zh.title} 將於 ${formatTime(nextSession.start, false)} 開始`,
          uri: nextSession.uri,
          type: nextSession.type,
        }
      }
    }

    // no nextSession
    return {
      room,
      course: '今日議程已結束',
      type: '',
    }
  })
})

onMounted(() => {
  const query = new URLSearchParams(window.location.search)
  testMode.value = query.get('test') === 'true'
  startClock()
  fetch('https://coscup.org/2024/json/session.json')
    .then((res) => res.json())
    .then((data) => {
      session_types.value = data.session_types.reduce((acc, item) => {
        acc[item.id] = item.zh.name
        return acc
      }, {})
      rooms.value = new Set(data.sessions.map((session) => session.room))
      rooms.value = [...rooms.value].sort((a, b) => a.localeCompare(b))
      crowd.value = rooms.value.reduce((acc, item) => {
        acc[item] = Math.round(Math.random() * 100)
        return acc
      }, {})
      sessions.value = rooms.value.reduce((acc, item) => {
        acc[item] = data.sessions.filter((session) => session.room === item).sort((a, b) => new Date(a.start) - new Date(b.start))
        return acc
      }, {})
    })
})

function startClock() {
  if (testMode.value) {
    currentTime.value = new Date('2024-08-03T08:30:00')

    timer.value = setInterval(() => {
      currentTime.value = new Date(currentTime.value.getTime() + 60 * 100)
    }, 100)
  } else {
    timer.value = setInterval(() => {
      currentTime.value = new Date()
    }, 10 * 1000)
  }
}

function formatTime(time, date = true) {
  const d = new Date(time)
  const MM = String(d.getMonth() + 1).padStart(2, '0')
  const DD = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const dayName = weekdays[d.getDay()]

  if (date) {
    return `${MM}/${DD}(${dayName}) ${hh}:${mm}`
  } else {
    return `${hh}:${mm}`
  }
}

function interpolateColor(color1, color2, factor) {
  const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)))
  return `rgb(${result[0]}, ${result[1]}, ${result[2]}, 0.6)`
}

function getColor(type, value) {
  if (typeof type === 'string') {
    return 'transparent'
  }
  const green = [189, 252, 201]
  const yellow = [255, 255, 153]
  const red = [255, 181, 181]

  if (value <= 50) {
    return interpolateColor(green, yellow, value / 50)
  } else {
    return interpolateColor(yellow, red, (value - 50) / 50)
  }
}

function getStatusText(type, value) {
  if (typeof type === 'string') {
    return ''
  }
  const words = ['空曠', '寬敞', '適中', '熱絡', '滿座']
  return words[Math.min(Math.round(value / 20), 4)]
}
</script>

<template>
  <div>
    <p>現在時間：{{ formatTime(currentTime) }}</p>
    <div class="grid-table">
      <div class="header">
        會議室
      </div>
      <div class="header">
        議程軌
      </div>
      <div class="header">
        教室狀態
      </div>
      <div class="header">
        議程
      </div>

      <template
        v-for="session in roomStatus"
        :key="session.room"
      >
        <div class="cell">
          {{ session.room }}
        </div>
        <div class="cell">
          {{ session.type ? session_types[session.type] : session.type }}
        </div>
        <div
          class="cell"
          :style="{ 'background-color': `${getColor(session.course, crowd[session.room])}` }"
        >
          {{ getStatusText(session.course, crowd[session.room]) }}
        </div>
        <div class="cell session-room">
          <Status
            v-if="typeof session.course !== 'string'"
            :current-time="currentTime"
            :data="session.course"
          />
          <span
            v-else-if="session.course === '今日議程已結束'"
            class="empty-room"
          >{{ session.course }}</span>
          <span
            v-else
            class="empty-room"
          ><a :href="session.uri">{{ session.course }}</a></span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.grid-table {
  display: grid;
  grid-template-columns: 6em 20% 6em auto;
  border-collapse: collapse;
  overflow-wrap: break-word;
}

.header {
  font-weight: bold;
  text-align: center;
  background-color: var(--vp-c-default-2);
  padding: 8px;
  border: 1px solid var(--vp-c-default-1);
}

.cell {
  padding: 8px;
  border: 1px solid var(--vp-c-default-1);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.session-room {
  padding: 0;
  display: flex;
  align-items: stretch;
}

.session-room > * {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-room {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
}

a {
  text-decoration: none;
  color: var(--vp-custom-block-tip-text);
}
</style>
