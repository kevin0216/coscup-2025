<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'
import type { MessageKey } from './session-messages.ts'
import { useRouter } from 'vitepress'
import { computed, defineAsyncComponent } from 'vue'
import SessionModal from './SessionModal.vue'

const props = defineProps<{
  sessionCode: string | undefined
  rooms: { id: number, name: string }[]
  submissions: SubmissionResponse[]
  messages: Record<MessageKey, string>
}>()

const SessionSchedule = defineAsyncComponent(() => import('./SessionsSchedule.vue'))

const openedSession = computed(() => {
  if (props.sessionCode) {
    return props.submissions.find((session) => session.code === props.sessionCode) ?? null
  }

  return null
})

const router = useRouter()

function handleCloseSession() {
  const pathname = new URL('.', location.href).pathname
  router.go(pathname)
}
</script>

<template>
  <!-- make the main content show earlier -->
  <SessionModal
    :messages="props.messages"
    :session="openedSession"
    @close="handleCloseSession"
  />

  <div :class="$style['sessions-page']">
    <SessionSchedule
      :messages="props.messages"
      :opened-session="openedSession"
      :rooms="props.rooms"
      :submissions="props.submissions"
    />
  </div>
</template>

<style module>
.sessions-page {
  width: 100%;

  /* prevent CLS */
  min-height: calc(100vh - var(--vp-nav-height));
}
</style>
