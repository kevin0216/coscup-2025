<script setup>
import { computed, onMounted, ref } from 'vue'
import Status from './Status.vue'

const sessions = ref([])
const rooms = ref([])
const testMode = ref(false)
const currentTime = ref(new Date())
const timer = ref(null)

const roomStatus = computed(() => {
  const activeSessions = sessions.value.filter(
    (session) => {
      const start = new Date(session.start)
      const end = new Date(session.end)
      return start <= currentTime.value && currentTime.value <= end
    },
  )

  return rooms.value.map((room) => {
    const currentCourse = activeSessions.find((course) => course.room === room)

    if (currentCourse) {
      return {
        room,
        course: {
          title: currentCourse.zh.title,
          start: currentCourse.start,
          end: currentCourse.end,
        },
      }
    } else {
      return {
        room,
        course: '無',
      }
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
      sessions.value = data.sessions
      rooms.value = new Set(sessions.value.map((session) => session.room))
      rooms.value = [...rooms.value].sort((a, b) => a.localeCompare(b))
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

function formatTime(time) {
  const d = new Date(time)
  const MM = String(d.getMonth() + 1).padStart(2, '0')
  const DD = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const dayName = weekdays[d.getDay()]

  return `${MM}/${DD}(${dayName}) ${hh}:${mm}`
}
</script>

<template>
  <div>
    <p>現在時間：{{ formatTime(currentTime) }}</p>
    <table>
      <thead>
        <tr>
          <th>會議室</th>
          <th>進行中議程</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="session in roomStatus"
          :key="session.room"
        >
          <td>{{ session.room }}</td>
          <td
            v-if="typeof session.course === 'string'"
            class="empty-room"
          >
            {{ session.course }}
          </td>
          <td
            v-else
            class="session-room"
          >
            <Status
              :current-time="currentTime"
              :data="session.course"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table th {
  text-align: center;
}
.session-room {
  padding: 0;
}
table th:first-child {
  width: 15%;
  min-width: 7em;
}
table th:nth-child(2) {
  width: 85%;
}
.empty-room {
  text-align: center;
}
</style>
