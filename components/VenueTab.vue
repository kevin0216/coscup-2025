<script setup>
import { ref } from 'vue'

// 用 import 載入圖片
import img2f from '/@/assets/images/venue/03_TR2F.png'
import img3f from '/@/assets/images/venue/04_TR3F.png'
import img4f from '/@/assets/images/venue/05_TR4F.png'
import img5f from '/@/assets/images/venue/06_TR5F.png'

const activeTab = ref(0)

const tabs = [
  { name: '2F', image: img2f },
  { name: '3F', image: img3f },
  { name: '4F', image: img4f },
  { name: '5F', image: img5f },
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
