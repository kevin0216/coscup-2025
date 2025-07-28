<script setup lang="ts">
import Banner from '#components/Banner.vue'
import mediumZoom from 'medium-zoom'
import { inBrowser, useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch, watchEffect } from 'vue'

const { lang } = useData()

watchEffect(() => {
  if (inBrowser) {
    document.cookie = `lang=${lang.value};path=/`
  }
})

const route = useRoute()

function initZoom() {
  mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
}

function updateNavBarMenuClass() {
  if (!inBrowser) return

  const params = new URLSearchParams(window.location.search)
  const nav = document.querySelector('.VPNav')
  if (!nav) return

  nav.classList.toggle('hide', params.get('mode') === 'app')
}

onMounted(() => {
  initZoom()
  updateNavBarMenuClass()
})

watch(
  () => route.path,
  () => nextTick(() => {
    initZoom()
    updateNavBarMenuClass()
  }),
)
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-before>
      <Banner />
    </template>
  </DefaultTheme.Layout>
  <Footer />
</template>
