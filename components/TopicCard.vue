<script setup lang="ts">
import { useData } from 'vitepress'

defineProps<{ topic: any }>()

const { lang } = useData()
const user_lang = lang.value === 'en-US' ? 'en' : 'zh-TW'
</script>

<template>
  <div
    class="topic-card"
  >
    <div class="topic-image-wrap">
      <img
        v-if="topic.image"
        :alt="topic[`name:${user_lang}`]"
        class="topic-image"
        :src="topic.image"
      >
      <span v-else>{{ topic[`name:${user_lang}`] }}</span>
    </div>
    <div class="topic-content-wrap">
      <h3 class="topic-name">
        <a :href="topic.image">
          {{ topic[`name:${user_lang}`] }}
        </a>
      </h3>
      <input
        v-show="false"
        :id="`topic-${topic.id}`"
        class="topic-moreinfo"
        type="checkbox"
      >
      <div class="topic-info">
        <p v-html="topic[`intro:${user_lang}`]" />
      </div>
      <label
        v-if="user_lang === 'zh-TW'"
        class="topic-moreinfo-zh"
        :for="`topic-${topic.id}`"
      />
      <label
        v-if="user_lang === 'en'"
        class="topic-moreinfo-en"
        :for="`topic-${topic.id}`"
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

.topic-card {
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

.topic-card:hover {
  transform: translateY(-4px);
}

.topic-image-wrap {
  position: relative;
  z-index: 0;
  max-width: min-content;
  margin: auto;
}

.topic-image-wrap img {
  min-width: 240px;
  aspect-ratio: 3 / 2;
  position: sticky;
  top: 75px;
  margin-top: 50px;
  object-fit: contain;
}

.topic-image-wrap span {
  display: block;
  min-width: 240px;
  aspect-ratio: 3 / 2;
  position: sticky;
  top: 75px;
  margin-top: 50px;
}

.topic-image {
  object-fit: contain;
}

.topic-contact {
  text-align: left;
  text-decoration-line: underline;
}

.topic-info {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

div.topic-content-wrap {
  width: 100%;
}

.topic-content-wrap label.topic-moreinfo-zh::after {
  content: '閱讀更多';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.topic-content-wrap label.topic-moreinfo-en::after {
  content: 'read more';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.topic-content-wrap input.topic-moreinfo:checked ~ label.topic-moreinfo-zh::after {
  content: '較少顯示';
}

.topic-content-wrap input.topic-moreinfo:checked ~ label.topic-moreinfo-en::after {
  content: 'less';
}

.topic-content-wrap input.topic-moreinfo:checked ~ .topic-info {
  -webkit-line-clamp: none;
}

.topic-name {
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
  .topic-card {
    flex-direction: column;
  }

  .topic-image-wrap img {
    position: static;
    margin: auto;
  }
}
</style>
