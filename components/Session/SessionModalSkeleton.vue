<template>
  <div class="modal-overlay-wrapper">
    <div class="modal-overlay" />
    <aside
      aria-modal="true"
      class="modal-panel"
      role="dialog"
    >
      <article class="dialog-content">
        <header class="dialog-header">
          <div class="skeleton-line skeleton-title" />
          <div class="skeleton-button skeleton-close" />
        </header>

        <div class="dialog-body">
          <div class="session-info">
            <div class="skeleton-line skeleton-info" />
            <div class="skeleton-line skeleton-info short" />
          </div>

          <div class="session-content">
            <div class="skeleton-line" />
            <div class="skeleton-line" />
            <div class="skeleton-line short" />
            <div class="skeleton-line" />
            <div class="skeleton-line medium" />
          </div>
        </div>
      </article>
    </aside>
  </div>
</template>

<style scoped>
.modal-overlay-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  width: 600px;
  overflow-y: auto;
}

.dialog-content {
  padding: 24px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.session-info {
  margin-bottom: 20px;
}

.session-content {
  margin-bottom: 16px;
}

.skeleton-line {
  height: 16px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 12px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-title {
  height: 24px;
  width: 70%;
}

.skeleton-info {
  height: 14px;
  width: 40%;
}

.skeleton-info.short {
  width: 25%;
}

.skeleton-line.short {
  width: 60%;
}

.skeleton-line.medium {
  width: 80%;
}

.skeleton-button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.skeleton-close {
  margin-left: auto;
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
