<script setup lang="ts">
import type { Topics } from '#loaders/community.data'
import { data } from '#loaders/community.data'
import { computed } from 'vue'
import TopicCard from './TopicCard.vue'

const topics = computed(() => data.communities.reduce((acc: Topics[], curr) => {
  const t = curr.topics as Topics
  if (!t) return acc
  t.image = curr.image
  acc.push(t)

  return acc
}, []))
</script>

<template>
  <div class="topic-list">
    <TopicCard
      v-for="topic in topics as Topics[]"
      :key="topic.id"
      :topic="topic"
    />
  </div>
</template>

<style scoped>
.topic-list {
  margin-top: 10px;
}

.topic-card {
  margin: 20px 0;
}
</style>
