<!-- eslint-disable no-console -->
<script setup lang="ts">
import CFilterModal from '#components/CFilterModal.vue'
import { ref } from 'vue'

const filterOptions = ref([
  { id: '1', label: 'Google 開發者派對', checked: false },
  { id: '2', label: 'Mozilla 開發者聚會', checked: false },
  { id: '3', label: 'Vue.js 台灣社群', checked: true },
  { id: '4', label: 'React 開發者聚會', checked: false },
  { id: '5', label: 'JavaScript 台北', checked: false },
  { id: '6', label: 'Python 台灣使用者群組', checked: false },
  { id: '7', label: 'DevOps 台灣', checked: false },
  { id: '8', label: 'Kubernetes 台灣使用者群組', checked: false },
])

function handleSearch(value: string) {
  console.log('Search:', value)
}

function handleToggle(id: string, checked: boolean) {
  const option = filterOptions.value.find((opt) => opt.id === id)
  if (option) {
    option.checked = checked
  }
  console.log('Toggle:', id, checked)
}
</script>

<template>
  <div style="max-width: 240px;">
    <CFilterModal
      :options="filterOptions"
      search-placeholder="搜尋社群..."
      @search="handleSearch"
      @toggle="handleToggle"
    />
  </div>
</template>
