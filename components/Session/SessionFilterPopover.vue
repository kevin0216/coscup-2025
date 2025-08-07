<script setup lang="ts">
import type { Component } from 'vue'
import CFilterModal from '#components/CFilterModal.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { PopoverArrow, PopoverContent, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { computed } from 'vue'

interface FilterOption {
  id: string
  label: string
  checked?: boolean
}

interface Props {
  options: FilterOption[]
  searchPlaceholder: string
  icon: Component
  label: string
}

interface Emits {
  toggle: [id: string, checked: boolean]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const hasCheckedOptions = computed(() => {
  return props.options.some((option) => option.checked)
})

const triggerLabel = computed(() => {
  if (hasCheckedOptions.value) {
    return props.options.filter((option) => option.checked).map((option) => option.label).join(', ')
  }

  return props.label
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('sm')

function clearFilters() {
  props.options.forEach((option) => {
    if (option.checked) {
      emit('toggle', option.id, false)
    }
  })
}
</script>

<template>
  <PopoverRoot class="session-filter-popover">
    <PopoverTrigger
      as="div"
      class="popover-trigger"
    >
      <CButton
        :class="{ active: hasCheckedOptions }"
        variant="basic"
      >
        <template #icon>
          <component :is="icon" />
        </template>
        <div
          v-if="isDesktop"
          class="trigger-label"
        >
          {{ triggerLabel }}
        </div>
      </CButton>
      <button
        v-if="hasCheckedOptions"
        aria-label="Clear filters"
        class="clear-button"
        type="reset"
        @click="clearFilters"
      >
        <IconPhX />
      </button>
    </PopoverTrigger>
    <PopoverContent
      class="popover-content"
      :collision-padding="32"
    >
      <CFilterModal
        :options="options"
        :search-placeholder="searchPlaceholder"
        @toggle="(id, checked) => emit('toggle', id, checked)"
      />
      <PopoverArrow class="popover-arrow" />
    </PopoverContent>
  </PopoverRoot>
</template>

<style>
.popover-content {
  z-index: 20;
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

<style scoped>
.popover-trigger {
  position: relative;
}

.active {
  position: relative;
  background-color: var(--color-primary-50);
  color: var(--color-primary-500);

  > .trigger-label {
    flex: 1;
    min-width: 0;
    max-width: 16rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.clear-button {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5em;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: calc(infinity * 1px);

  /* Increase the clickable area */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
  }
}
</style>
