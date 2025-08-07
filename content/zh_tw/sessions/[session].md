---
layout: page
---

<script setup lang="ts">
import { useData } from 'vitepress'
import { data as submissions } from '#loaders/allSubmissions.zh-tw.data.ts'
import { data as rooms } from '#loaders/rooms.zh-tw.data.ts'
import { zhTwMessages } from '#components/Session/session-messages.ts'
import { computed } from 'vue';

const { params } = useData();
const sessionCode = computed(() => {
    return params.value?.session;
})
</script>

<SessionsPage :messages="zhTwMessages" :session-code="sessionCode" :rooms="rooms" :submissions="submissions" />
