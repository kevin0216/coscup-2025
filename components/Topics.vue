<script setup lang="ts">
import { data } from '#loaders/community.data'
import { computed } from 'vue'
import TopicCard from './TopicCard.vue'

const topics = computed(() => data.communities.reduce((acc, curr) => {
  const t = curr.topics
  if (!t) return acc
  t.image = curr.image
  acc.push(t)

  return acc
}, []))
</script>

<template>
  <div class="topic-list">
    <TopicCard
      v-for="topic in topics"
      :key="topic.topic_id"
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
