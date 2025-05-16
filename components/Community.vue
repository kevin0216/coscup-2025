<script setup lang="ts">
import { data } from '#loaders/community.data'
import { ref } from 'vue'

const { communities, community_topics, community_booths } = data

// 控制展開的社群卡片
const expanded = ref<string | null>(null)

function toggleExpand(id: string) {
  expanded.value = expanded.value === id ? null : id
}

// 處理 Google Drive 圖片
function getImageUrl(image: string) {
  if (image.includes('drive.google.com')) {
    const match = image.match(/\/d\/([^/]+)\//)
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`
    }
  }
  return image
}

// 根據社群 ID 取得所屬的 topics & booths
function getTopics(communityId: string): any[] {
  return community_topics[communityId] || []
}

function getBooths(communityId: string): any[] {
  return community_booths[communityId] || []
}

const showTagDetail = ref(false)
const selectedTag = ref<any>(null)
const selectedTagType = ref<'topic' | 'booth' | null>(null)

function openTagDetail(tag: any, type: 'topic' | 'booth') {
  selectedTag.value = tag
  selectedTagType.value = type
  showTagDetail.value = true
}

function closeTagDetail() {
  showTagDetail.value = false
  selectedTag.value = null
  selectedTagType.value = null
}
</script>

<template>
  <div class="community-list">
    <div
      v-for="community in communities"
      :key="community.id"
      class="community-card"
      @click="toggleExpand(community.id)"
    >
      <div class="card-content">
        <div class="community-image-wrapper">
          <img
            :alt="community['name:zh-TW']"
            class="community-image"
            :src="getImageUrl(community.image)"
          >
        </div>

        <div class="community-text">
          <h1 class="community-name">
            {{ community['name:zh-TW'] }}
          </h1>

          <a
            class="community-link"
            :href="community.link"
            rel="noopener noreferrer"
            target="_blank"
            @click.stop
          >
            🔗 官方網站
          </a>

          <div class="community-tags">
            <div class="topics-wrapper">
              <span
                v-for="topic in getTopics(community.id)"
                :key="topic"
                class="tag topic"
                @click.stop="openTagDetail(topic, 'topic')"
              >
                #{{ topic['name:zh-TW'] }}
              </span>
            </div>

            <div class="booths-wrapper">
              <span
                v-for="booth in getBooths(community.id)"
                :key="booth"
                class="tag booth"
                @click.stop="openTagDetail(booth, 'booth')"
              >
                #{{ booth['name:zh-TW'] }}
                <!--
                <small class="booth-meta">（社群：{{ booth['community'] }}）</small>
                -->
              </span>
            </div>
          </div>

          <transition name="fade">
            <div
              v-if="expanded === community.id"
              class="community-info"
            >
              <p>{{ community['intro:zh-TW'] }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showTagDetail"
    class="modal-backdrop"
    @click.self="closeTagDetail"
  >
    <div class="modal-content">
      <h3>{{ selectedTagType === 'topic' ? '議程主題與活動' : '參展攤位' }}</h3>
      <ul class="detail-list">
        <li><strong>名稱：</strong>{{ selectedTag['name:zh-TW'] }}</li>
        <li><strong>簡介：</strong>{{ selectedTag['intro:zh-TW'] }}</li>
        <li v-if="selectedTag.link">
          <strong>連結：</strong>
          <a
            :href="selectedTag.link"
            target="_blank"
          >{{ selectedTag.link }}</a>
        </li>
        <li v-if="selectedTag.community">
          <strong>社群：</strong>{{ selectedTag.community }}
        </li>
        <li v-if="selectedTag.room">
          <strong>展區：</strong>{{ selectedTag.room }}
        </li>
        <li v-if="selectedTag.trackroom">
          <strong>軌：</strong>{{ selectedTag.trackroom }}
        </li>
      </ul>
      <button
        class="modal-close"
        @click="closeTagDetail"
      >
        關閉
      </button>
    </div>
  </div>
</template>

<style scoped>
.community-list {
  padding: 20px;
  display: grid;
  gap: 24px;
}

.community-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 16px;
  transition: transform 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
}

.community-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  gap: 16px;
  width: 100%;
}

.community-image-wrapper {
  flex: 1;
  max-width: 33%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.community-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
}

.community-text {
  flex: 2;
}

.community-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.community-link {
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 10px;
  padding: 4px 8px;
  border: 1px solid var(--vp-c-brand);
  border-radius: 5px;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.community-link:hover {
  background-color: var(--vp-c-brand);
  color: white;
}

.community-info {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 10px;
  border-radius: 6px;
  margin-top: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }

  .community-image-wrapper {
    max-width: 100%;
    margin-bottom: 12px;
  }

  .community-text {
    flex-direction: column;
    align-items: center;
  }
}

.community-tags {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.topics-wrapper,
.booths-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-weight: 500;
}

.topic {
  background-color: #fff4cc;
  color: #664d03;
  border: 1px solid #ffe58f;
}

.booth {
  background-color: #ccf2f1;
  color: #00504e;
  border: 1px solid #87e0dc;
}

.detail-list {
  margin: 10px 0;
  padding-left: 1rem;
  list-style-type: disc;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.detail-list li {
  margin-bottom: 6px;
  line-height: 1.4;
  word-break: break-word;
}

.detail-list a {
  color: var(--vp-c-brand);
  text-decoration: underline;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-content h3 {
  margin-top: 0;
  font-size: 1.2rem;
}

.modal-close {
  margin-top: 16px;
  padding: 6px 12px;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
