<script setup lang="ts">
import CTextField from '#components/CTextField.vue'
import { computed } from 'vue'

interface FilterOption {
  id: string
  label: string
  checked?: boolean
}

interface Props {
  options?: FilterOption[]
  searchPlaceholder?: string
}

interface Emits {
  toggle: [id: string, checked: boolean]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  searchPlaceholder: 'Search…',
})

const emit = defineEmits<Emits>()

const searchValue = defineModel<string>('search', { default: '' })

const filteredOptions = computed(() => {
  if (!searchValue.value) {
    return props.options
  }

  const searchTerm = searchValue.value.toLowerCase()
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm),
  )
})

function handleToggle(id: string, event: Event) {
  const target = event.target as HTMLInputElement
  emit('toggle', id, target.checked)
}
</script>

<template>
  <div class="filter-modal">
    <!-- Search field -->
    <div class="filter-modal-search">
      <CTextField
        v-model="searchValue"
        :placeholder="searchPlaceholder"
      />
    </div>

    <!-- Separator -->
    <div class="filter-modal-separator" />

    <!-- Options list -->
    <div class="filter-modal-options">
      <div
        v-for="option in filteredOptions"
        :key="option.id"
        class="filter-modal-option"
      >
        <CCheckbox
          :checked="option.checked"
          :name="option.id"
          @change="handleToggle(option.id, $event)"
        >
          {{ option.label }}
        </CCheckbox>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-modal {
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-300);
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: calc(100vw - 64px);
}

.filter-modal-search {
  height: 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-modal-separator {
  height: 1px;
  background-color: var(--color-gray-300);
  margin: 4px 0;
}

.filter-modal-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 6px;
  max-height: 50vh;
  overflow-y: auto;
}

.filter-modal-option {
  display: flex;
  align-items: center;
  padding: 0;
}
</style>
