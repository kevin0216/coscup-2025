<script setup lang="ts">
import CTextField from '#components/CTextField.vue'
import { computed, ref } from 'vue'

const inputValue = ref('')

const fieldState = computed(() => {
  return inputValue.value === 'error' ? 'error' : 'default'
})
</script>

<template>
  <div class="demo-container">
    <div class="demo-section">
      <h3>TextField Demo</h3>
      <p>Type "error" to see the error state</p>
      <CTextField
        v-model="inputValue"
        placeholder="Search event"
        :state="fieldState"
      />
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 400px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-section h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-gray-700);
}
</style>
