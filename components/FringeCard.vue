<script setup lang="ts">
import type { Fringe } from '#loaders/fringe.data'
import { useData } from 'vitepress'

defineProps<{ fringe: Fringe }>()

const { lang } = useData()
const user_lang = lang.value === 'en-US' ? 'en' : 'zh-TW'
</script>

<template>
  <div
    class="fringe-card"
  >
    <div class="fringe-image-wrap">
      <a :href="fringe.link">
        <img
          v-if="fringe.logo"
          :alt="fringe[`title:${user_lang}`]"
          class="fringe-image"
          :src="fringe.logo"
        >
        <span v-else>{{ fringe[`title:${user_lang}`] }}</span>
      </a>
    </div>
    <div class="fringe-content-wrap">
      <h3 class="fringe-name">
        <a :href="fringe.link">
          {{ fringe[`title:${user_lang}`] }}
        </a>
      </h3>
      <div
        v-if="fringe.contact"
        class="fringe-contact"
      >
        <p v-html="`${fringe.contact} < ${fringe.contact_email} >`" />
      </div>
      <input
        v-show="false"
        :id="`fringe-${fringe.id}`"
        class="fringe-moreinfo"
        type="checkbox"
      >
      <div class="fringe-info">
        <p v-html="fringe[`description:${user_lang}`]" />
      </div>
      <label
        v-if="user_lang === 'zh-TW'"
        class="fringe-moreinfo-zh"
        :for="`fringe-${fringe.id}`"
      />
      <label
        v-if="user_lang === 'en'"
        class="fringe-moreinfo-en"
        :for="`fringe-${fringe.id}`"
      />
    </div>
  </div>
</template>

<style scoped>
a {
  font-weight: bold;
  color: var(--vp-c-brand-3);
  text-decoration: none;
}

.fringe-card {
  position: relative;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  background: var(--vp-color-sponsor-card-bg);
  border: 1px solid var(--vp-color-sponsor-card-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  gap: 0 15px;
}

.fringe-card:hover {
  transform: translateY(-4px);
}

.fringe-image-wrap {
  position: relative;
  z-index: 0;
  max-width: min-content;
  margin: auto;
}

.fringe-image-wrap img {
  min-width: 240px;
  aspect-ratio: 3 / 2;
  position: sticky;
  top: 75px;
  margin-top: 50px;
  object-fit: contain;
}

.fringe-image-wrap span {
  display: block;
  min-width: 240px;
  aspect-ratio: 3 / 2;
  position: sticky;
  top: 75px;
  margin-top: 50px;
}

.fringe-image {
  object-fit: contain;
}

.fringe-contact {
  text-align: left;
  text-decoration-line: underline;
}

.fringe-info {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

div.fringe-content-wrap {
  width: 100%;
}

.fringe-content-wrap label.fringe-moreinfo-zh::after {
  content: '閱讀更多';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.fringe-content-wrap label.fringe-moreinfo-en::after {
  content: 'read more';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.fringe-content-wrap input.fringe-moreinfo:checked ~ label.fringe-moreinfo-zh::after {
  content: '較少顯示';
}

.fringe-content-wrap input.fringe-moreinfo:checked ~ label.fringe-moreinfo-en::after {
  content: 'less';
}

.fringe-content-wrap input.fringe-moreinfo:checked ~ .fringe-info {
  -webkit-line-clamp: none;
}

.fringe-name {
  text-align: left;
}

.badge {
  width: 185px;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  background: var(--vp-c-brand-3);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  transform: translateY(70%) translateX(-15%) rotate(-30deg);
  font-size: 0.8em;
}

@media screen and (max-width: 600px) {
  .fringe-card {
    flex-direction: column;
  }

  .fringe-image-wrap img {
    position: static;
    margin: auto;
  }
}
</style>
