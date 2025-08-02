<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'
import type { MessageKey } from './session-messages.ts'
import { useRouter } from 'vitepress'
import { computed, defineAsyncComponent, h } from 'vue'
import SessionModal from './SessionModal.vue'

const props = defineProps<{
  sessionCode: string | undefined
  rooms: { id: number, name: string }[]
  submissions: SubmissionResponse[]
  messages: Record<MessageKey, string>
}>()

const SessionSchedule = defineAsyncComponent({
  loader: () => import('./SessionsSchedule.vue'),
  loadingComponent: () => h('div', { style: { width: '100%', height: '100vh' } }),
  delay: 0,
})

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

  <ClientOnly>
    <SessionSchedule
      :messages="props.messages"
      :opened-session="openedSession"
      :rooms="props.rooms"
      :submissions="props.submissions"
    />
  </ClientOnly>
</template>
