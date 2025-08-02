<script setup lang="ts">
import { data } from '#loaders/fringe.data'

const fringeData = data
</script>

<template>
  <div class="fringe-list">
    <FringeCard
      v-for="fringe in fringeData"
      :key="fringe.id"
      :fringe="fringe"
    />
  </div>
</template>

<style scoped>
h2 {
  border: none;
}

.fringe-card {
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: var(--vp-color-sponsor-bg);
  color: var(--vp-color-sponsor-muted);
  transition: transform 0.2s;
}

.fringe-card:hover {
  transform: translateY(-4px);
}

.fringe-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
  display: block;
}

.fringe-link {
  display: inline-block;
  text-decoration: none;
  color: var(--vp-color-sponsor-primary);
  font-weight: bold;
  padding: 5px 10px;
  border: 1px solid var(--vp-color-sponsor-border);
  border-radius: 5px;
  transition:
    background 0.2s,
    color 0.2s;
}

.fringe-link:hover {
  background: var(--vp-color-sponsor-primary);
  color: white;
}
</style>
