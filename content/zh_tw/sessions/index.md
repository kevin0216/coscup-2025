---
layout: page
---

<script setup lang="ts">
import { data as submissions } from '#loaders/allSubmissions.zh-tw.data.ts'
import { data as rooms } from '#loaders/rooms.zh-tw.data.ts'
import { zhTwMessages } from '#components/Session/session-messages.ts'
</script>

<SessionsPage :messages="zhTwMessages" :session-code="undefined" :rooms="rooms" :submissions="submissions" />
