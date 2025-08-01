---
layout: page
---

<script setup lang="ts">
import { data as submissions } from '#loaders/allSubmissions.en.data.ts'
import { data as rooms } from '#loaders/rooms.en.data.ts'
import { enMessages } from '#components/Session/session-messages.ts'
</script>

<SessionsPage :messages="enMessages" :session-code="undefined" :rooms="rooms" :submissions="submissions" />
