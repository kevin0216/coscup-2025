<script setup>
import { ref } from 'vue'

// 用 import 載入圖片
import booth309 from '/@/assets/images/venue/booth309.png'
import booth312 from '/@/assets/images/venue/booth312.png'
import booth409 from '/@/assets/images/venue/booth409.png'

const activeTab = ref(0)

const tabs = [
  { name: 'TR 309', image: booth309 },
  { name: 'TR 312', image: booth312 },
  { name: 'TR 409-1', image: booth409 },
]
</script>

<template>
  <div class="venue-tab">
    <div class="tab-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="tab-content">
      <img
        :alt="tabs[activeTab].name"
        :src="tabs[activeTab].image"
      >
    </div>
  </div>
</template>

<style scoped>
.venue-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-header {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-header button {
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  color: #1e293b;
  border: 1px solid #e5e7eb;
  border-radius: 8px; /* 這裡是「方圓」 */
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s;
}

.tab-header button.active {
  background-color: #ede9fe; /* 淺紫 */
  border-color: #c4b5fd; /* 淺紫邊框 */
}

.tab-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
