<script setup lang="ts">
import type { groupedCommunities } from '#loaders/community.data.ts'
import { useData } from 'vitepress'
import PhCaretDownBold from '~icons/ph/caret-down-bold'
import PhCaretRightBold from '~icons/ph/caret-right-bold'

defineProps<{ community: groupedCommunities }>()

const { lang } = useData()
const user_lang = lang.value === 'en-US' ? 'en' : 'zh-TW'
</script>

<template>
  <div
    class="community-card"
  >
    <div class="community-image-wrap">
      <a :href="community.link">
        <img
          :alt="community[`name:${user_lang}`]"
          class="community-image"
          :src="community.image ?? '#'"
        >
      </a>
    </div>
    <div class="community-content-wrap">
      <h3 class="community-name">
        <a :href="community.link">
          {{ community[`name:${user_lang}`] }}
        </a>
      </h3>
      <input
        v-show="false"
        :id="`community-${community.id}`"
        class="community-moreinfo"
        type="checkbox"
      >
      <div class="community-info">
        <p v-html="community[`intro:${user_lang}`]" />
      </div>
      <label
        v-if="user_lang === 'zh-TW'"
        class="community-moreinfo-zh"
        :for="`community-${community.id}`"
      />
      <label
        v-if="user_lang === 'en'"
        class="community-moreinfo-en"
        :for="`community-${community.id}`"
      />
      <div class="community-more-info">
        <input
          v-show="false"
          :id="`community-topics-${community.id}`"
          class="topics-info"
          type="checkbox"
        >
        <input
          v-show="false"
          :id="`community-booths-${community.id}`"
          class="booths-info"
          type="checkbox"
        >
        <label
          v-if="community.topics && user_lang === 'zh-TW'"
          class="topics-info-zh"
          :for="`community-topics-${community.id}`"
        />
        <label
          v-if="community.topics && user_lang === 'en'"
          class="topics-info-en"
          :for="`community-topics-${community.id}`"
        />
        <PhCaretDownBold
          v-if="community.topics"
          class="topics-show"
        />
        <PhCaretRightBold
          v-if="community.topics"
          class="topics-hidden"
        />
        <label
          v-if="community.booths && user_lang === 'zh-TW'"
          class="booths-info-zh"
          :for="`community-booths-${community.id}`"
        />
        <label
          v-if="community.booths && user_lang === 'en'"
          class="booths-info-en"
          :for="`community-booths-${community.id}`"
        />
        <PhCaretDownBold
          v-if="community.booths"
          class="booths-show"
        />
        <PhCaretRightBold
          v-if="community.booths"
          class="booths-hidden"
        />
        <div
          v-if="community.topics"
          class="topics-info"
        >
          <h3 class="community-name">
            <a :href="community.topics.link">
              {{ community.topics[`name:${user_lang}`] }}
            </a>
          </h3>
          <p v-html="community.topics[`intro:${user_lang}`]" />
        </div>
        <div
          v-if="community.booths"
          class="booths-info"
        >
          <h3 class="community-name">
            <a :href="community.booths.link">
              {{ community.booths[`name:${user_lang}`] }}
            </a>
          </h3>
          <p v-html="community.booths[`intro:${user_lang}`]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  font-weight: bold;
  color: var(--vp-c-brand-3);
  text-decoration: none;
}

.community-card {
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

.community-card:hover {
  transform: translateY(-4px);
}

.community-image-wrap {
  position: relative;
}

.community-image-wrap img {
  min-width: 240px;
  aspect-ratio: 3 / 2;
  position: sticky;
  top: 75px;
  margin-top: 50px;
  object-fit: contain;
}

.community-info {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

div.community-content-wrap {
  width: 100%;
}

.community-content-wrap label.community-moreinfo-zh::after {
  content: '閱讀更多';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.community-content-wrap label.community-moreinfo-en::after {
  content: 'read more';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.community-content-wrap input.community-moreinfo:checked ~ label.community-moreinfo-zh::after {
  content: '較少顯示';
}

.community-content-wrap input.community-moreinfo:checked ~ label.community-moreinfo-en::after {
  content: 'less';
}

.community-content-wrap input.community-moreinfo:checked ~ .community-info {
  -webkit-line-clamp: none;
}

.community-more-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  width: auto;
}

div.topics-info {
  display: none;
}

div.topics-info h3 {
  margin-top: 5px;
}

.community-more-info svg.topics-show {
  display: none;
}

.community-more-info label.topics-info-zh::after {
  content: '議程主題與活動';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: inline-block;
  cursor: pointer;
}

.community-more-info label.topics-info-en::after {
  content: 'Topics and Events';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.community-more-info input.topics-info:checked ~ div.topics-info {
  display: block;
  text-align: left;
  background-color: rgb(243, 244, 246);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
}

.community-more-info input.topics-info:checked ~ svg.topics-show {
  display: block;
}

.community-more-info input.topics-info:checked ~ svg.topics-hidden {
  display: none;
}

div.booths-info {
  display: none;
}

div.booths-info h3 {
  margin-top: 5px;
}

.community-more-info svg.booths-show {
  display: none;
}

.community-more-info label.booths-info-zh::after {
  content: '參展攤位';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 20px;
  display: block;
  cursor: pointer;
}

.community-more-info label.booths-info-en::after {
  content: 'Exhibitor Booths';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 20px;
  display: block;
  cursor: pointer;
}

.community-more-info input.booths-info:checked ~ div.booths-info {
  display: block;
  text-align: left;
  background-color: rgb(243, 244, 246);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
}

.community-more-info input.booths-info:checked ~ svg.booths-show {
  display: block;
}

.community-more-info input.booths-info:checked ~ svg.booths-hidden {
  display: none;
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
  .community-card {
    flex-direction: column;
  }

  .community-image-wrap img {
    position: static;
    margin: auto;
  }
}
</style>
