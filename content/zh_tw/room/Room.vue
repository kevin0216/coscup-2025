<script>
import Status from './Status.vue'

export default {
  components: {
    Status,
  },
  data() {
    return {
      sessions: [],
      rooms: [],
      testMode: false,
      currentTime: new Date(),
    }
  },
  computed: {
    roomStatus() {
      const activeSessions = this.sessions.filter(
        (session) => {
          const start = new Date(session.start)
          const end = new Date(session.end)
          return start <= this.currentTime && this.currentTime <= end
        },
      )

      return this.rooms.map((room) => {
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
    },
  },
  mounted() {
    const query = new URLSearchParams(window.location.search)
    this.testMode = query.get('test') === 'true'
    this.startClock()
    fetch('https://coscup.org/2024/json/session.json')
      .then((res) => res.json())
      .then((data) => {
        this.sessions = data.sessions
        const rooms = new Set(this.sessions.map((session) => session.room))
        this.rooms = [...rooms].sort((a, b) => a.localeCompare(b))
      })
  },
  methods: {
    startClock() {
      if (this.testMode) {
        this.currentTime = new Date('2024-08-03T08:30:00')

        this.timer = setInterval(() => {
          this.currentTime = new Date(this.currentTime.getTime() + 60 * 100)
        }, 100)
      } else {
        this.timer = setInterval(() => {
          this.currentTime = new Date()
        }, 10 * 1000)
      }
    },
    formatTime(time) {
      const d = new Date(time)
      const MM = String(d.getMonth() + 1).padStart(2, '0')
      const DD = String(d.getDate()).padStart(2, '0')
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      const weekdays = ['日', '一', '二', '三', '四', '五', '六']
      const dayName = weekdays[d.getDay()]

      return `${MM}/${DD}(${dayName}) ${hh}:${mm}`
    },
  },
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
  width: 7em;
}
.empty-room {
  text-align: center;
}
</style>
