<script setup lang="ts">
defineProps<{
  variant: 'mobile' | 'desktop'
}>()
</script>

<template>
  <nav
    class="session-date-tab-skeleton"
    :class="{ mobile: variant === 'mobile' }"
  >
    <div class="skeleton-tab-button" />
    <div class="skeleton-tab-button" />
  </nav>
</template>

<style scoped>
.session-date-tab-skeleton {
  display: flex;
  background: #f9fafb;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 16px;
}

.session-date-tab-skeleton.mobile {
  margin-bottom: 0;
  margin-top: 16px;
}

.skeleton-tab-button {
  flex: 1;
  height: 40px;
  background: #e5e7eb;
  border-radius: 6px;
  margin: 0 2px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.session-date-tab-skeleton.mobile .skeleton-tab-button {
  height: 44px;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
