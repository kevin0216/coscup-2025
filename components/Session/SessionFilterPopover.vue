<script setup lang="ts">
import CFilterModal from '#components/CFilterModal.vue'
import { PopoverArrow, PopoverContent, PopoverRoot, PopoverTrigger } from 'reka-ui'
</script>

<template>
  <PopoverRoot class="session-filter-popover">
    <PopoverTrigger><slot /></PopoverTrigger>
    <PopoverContent
      class="popover-content"
    >
      <CFilterModal v-bind="$attrs" />
      <PopoverArrow class="popover-arrow" />
    </PopoverContent>
  </PopoverRoot>
</template>

<style>
.popover-content {
  z-index: 1000;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state='open'][data-side='bottom'] {
    animation-name: slideDownAndFade;
  }
}

.popover-arrow {
  fill: var(--color-gray-300);
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
