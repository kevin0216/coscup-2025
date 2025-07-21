<script setup lang="ts">
import { data } from '#loaders/sponsor.data'
import { useData } from 'vitepress'

const { groupedSponsors, sponsorLevels, sponsorLevels_mapping } = data
const { lang } = useData()

const formatLevel = (level: string): string => level.charAt(0).toUpperCase() + level.slice(1)
</script>

<template>
  <div class="sponsor-footer-content">
    <div
      v-for="level in sponsorLevels"
      :key="level"
      class="sponsor-group"
    >
      <div v-if="groupedSponsors[level]?.length">
        <h3
          v-if="lang === 'zh_tw'"
          class="level-title"
        >
          {{ sponsorLevels_mapping[level] }}
        </h3>
        <h3
          v-else
          class="level-title"
        >
          {{ formatLevel(level) }} Sponsor
        </h3>
        <div class="sponsor-list">
          <a
            v-for="sponsor in groupedSponsors[level]"
            :key="sponsor.id"
            class="sponsor"
            :href="sponsor.link"
            rel="noopener"
            target="_blank"
          >
            <div class="sponsor-item">
              <img
                :alt="sponsor['name:zh-TW']"
                :src="sponsor.image ?? '#'"
              >
              <template v-if="lang === 'zh_tw'">
                <span
                  v-if="sponsor.type === '3'"
                  class="sponsor-times"
                >
                  累計 {{ sponsor.times }} 年合作
                </span>
                <span
                  v-else-if="sponsor.type === '2'"
                  class="sponsor-times"
                >
                  累計 {{ sponsor.times }} 年贊助
                </span>
                <span
                  v-else-if="sponsor.type === '1'"
                  class="sponsor-times"
                >
                  連續 {{ sponsor.times }} 年贊助
                </span>
              </template>
              <template v-else>
                <span
                  v-if="sponsor.type === '3'"
                  class="sponsor-times en"
                >Collaborated a total of {{ sponsor.times }} years</span>
                <span
                  v-else-if="sponsor.type === '2'"
                  class="sponsor-times en"
                >Sponsored a total of {{ sponsor.times }} years</span>
                <span
                  v-else-if="sponsor.type === '1'"
                  class="sponsor-times en"
                >Sponsored {{ sponsor.times }} consecutive years</span>
              </template>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sponsor-footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.sponsor-group {
  margin-bottom: 30px;
}

.level-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-transform: capitalize;
}

.sponsor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.sponsor {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
  width: 100%;
}

.sponsor-item {
  position: relative;
  padding: 8px;
  min-width: 180px;
  min-height: 180px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.sponsor:hover img {
  transform: scale(1.5); /* 圖片 hover 放大 */
}

.sponsor img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.sponsor-times {
  background-color: var(--vp-c-brand-3);
  color: white;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.875rem;
  margin-top: 8px;
  display: inline-block;
  position: absolute;
  bottom: 10px;
}

.en {
  font-size: 0.7em;
  padding: 2px 4px;
}
</style>
