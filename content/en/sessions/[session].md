---
layout: page
---

<script setup lang="ts">
import { useData } from 'vitepress'
import { data as submissions } from '#loaders/allSubmissions.en.data.ts'
import { data as rooms } from '#loaders/rooms.en.data.ts'
import { enMessages } from '#components/Session/session-messages.ts'
import { computed } from 'vue';

const { params } = useData();
const sessionCode = computed(() => {
    return params.value?.session;
})
</script>

<SessionsPage :messages="enMessages" :session-code="sessionCode" :rooms="rooms" :submissions="submissions" />
