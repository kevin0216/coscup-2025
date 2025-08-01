<template>
  <button
    class="filter-button-skeleton"
    disabled
  >
    <div class="skeleton-icon" />
    <div class="skeleton-label" />
  </button>
</template>

<style scoped>
.filter-button-skeleton {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: not-allowed;
  opacity: 0.7;
}

.skeleton-icon {
  width: 20px;
  height: 20px;
  background: #e5e7eb;
  border-radius: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-label {
  width: 80px;
  height: 16px;
  background: #e5e7eb;
  border-radius: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
