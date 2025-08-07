<script setup lang="ts">
interface actions {
  href: string
  display: string
}

defineProps<{
  actionsList: actions[]
}>()
</script>

<template>
  <div class="actions">
    <VPButton
      v-for="action in actionsList"
      :key="action.display"
      :href="action.href"
    >
      {{ action.display }}
    </VPButton>
  </div>
</template>

<style>
.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.actions .VPButton {
  text-decoration: none;
}
</style>
