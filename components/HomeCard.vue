<script setup lang='ts'>
import type { CardInfo } from '#data/home.ts'
import { useData } from 'vitepress'

defineProps<{ info: CardInfo }>()

const { lang } = useData()
const userLanguage = lang.value === 'zh_tw' ? 'zh_tw' : 'en-US'
</script>

<template>
  <div class="card">
    <div
      v-if="info.img"
      class="card-image-container"
    >
      <img
        :alt="info[`img_alt:${userLanguage}`]"
        class="card-image"
        :src="info.img"
      >
    </div>
    <div class="card-content">
      <div class="card-text">
        <p class="card-title">
          {{ info[`title:${userLanguage}`] }}
        </p>
        <p class="card-description">
          {{ info[`description:${userLanguage}`] }}
        </p>
      </div>
      <div class="card-action">
        <CButton
          v-if="info.link"
          :href="info.link"
          tag="a"
          target="_blank"
        >
          {{ info[`link_display:${userLanguage}`] }}
        </CButton>
        <CButton
          v-else
          disabled
        >
          {{ info[`link_display:${userLanguage}`] }}
        </CButton>
      </div>
    </div>
  </div>
</template>

<style scope>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem; /* 8px */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  min-width: 250px;
}

.card-image-container {
  flex-shrink: 0;
  width: 100%;
  height: 25%;
}

.card-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0px 0px;
}

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.card-text {
  flex: 1;
  padding: 1.5rem 1.5rem 0px 1.5rem;
}

.card-title {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: #3c3c5b;
}

.card-description {
  margin-top: 0.75rem;
  font-size: 1rem; /* 16px */
  color: #6b7280;
}

.card-action {
  padding: 1.5rem;
}

@media (min-width: 1024px) {
  .card {
    flex-direction: row-reverse;
    overflow: hidden;
  }

  .card-image-container {
    width: 40%;
    height: 100%;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-text {
    padding: 0px;
  }

  .card-action {
    padding: 0px;
    margin-top: 1.5rem;
  }
}
</style>
