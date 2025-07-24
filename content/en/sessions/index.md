---
layout: page
---

<script setup lang="ts">
import { data as submissions } from '#loaders/allSubmissions.en.data.ts'
import { data as rooms } from '#loaders/rooms.en.data.ts'
</script>

<SessionsPage locale="en" :session-code="undefined" :rooms="rooms" :submissions="submissions" />
