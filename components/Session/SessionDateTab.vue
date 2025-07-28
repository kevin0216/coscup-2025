<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant: 'mobile' | 'desktop'
  selectedDate: 'start' | 'end'
  startDate: Date
  endDate: Date
}>()

defineEmits<{
  'update:selectedDate': [value: 'start' | 'end']
}>()

// Format conference dates with spacing
function formatConferenceDate(date: Date): string {
  const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'Asia/Taipei' })
  const day = date.getDate()
  return `${month}.\u2009${day}` // thin space between month and day
}

const formattedStartDate = computed(() => formatConferenceDate(props.startDate))
const formattedEndDate = computed(() => formatConferenceDate(props.endDate))
</script>

<template>
  <nav
    class="session-date-tab"
    :class="{ mobile: variant === 'mobile' }"
  >
    <button
      class="session-date-button"
      :class="{ selected: selectedDate === 'start', mobile: variant === 'mobile' }"
      @click="$emit('update:selectedDate', 'start')"
    >
      {{ formattedStartDate }}
    </button>
    <button
      class="session-date-button"
      :class="{ selected: selectedDate === 'end', mobile: variant === 'mobile' }"
      @click="$emit('update:selectedDate', 'end')"
    >
      {{ formattedEndDate }}
    </button>
  </nav>
</template>

<style scoped>
.session-date-tab {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  height: var(--date-tab-height);

  &.mobile {
    margin-block: 8px 12px;
  }
}

.session-date-button {
  width: 13rem;
  font-family: Inter, sans-serif;
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
  color: var(--color-white);
  background-color: var(--color-gray-300);
  padding: 0.5rem 3rem;
  border: 3px solid var(--color-gray-700);
  border-radius: 999rem;
  box-shadow: 0px 4px 0px 0px var(--color-gray-700);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 0px 0px var(--color-gray-700);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 0px 0px var(--color-gray-700);
  }

  &.selected {
    background-color: var(--color-primary-400);
    cursor: default;

    &:hover {
      background-color: var(--color-primary-500);
      transform: none;
      box-shadow: 0px 4px 0px 0px var(--color-gray-700);
    }
  }

  &.mobile {
    width: 50%;
    font-family: 'PingFang TC', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: var(--text-lg);
    padding: 6px 12px;
  }
}
</style>
