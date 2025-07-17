import fs from 'node:fs'
import { resolve } from 'node:path'
// @ts-expect-error - No type definitions available
import markdownItContainer from 'markdown-it-container'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

// Subpath imports (e.g. '#data') for TypeScript files are not supported
// See https://github.com/vuejs/vitepress/issues/4173

import { conference } from '../../data/conference'
import { en } from './en'
import { zh_tw } from './zh_tw'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItContainer, 'div', {
        render(tokens: Array<{ info: string }>, idx: number) {
          const token = tokens[idx] as { info: string, nesting: number }
          const klass = token.info.trim().slice(3).trim()
          if (token.nesting === 1) {
            return `<div class="${klass}">\n`
          } else {
            // 结束标签
            return '</div>\n'
          }
        },
      })
    },
  },
  vite: {
    resolve: {
      alias: {
        '/@': resolve(__dirname, '../..'),
      },
    },
    plugins: [
      Components({
        // Auto import components and icons in Vue and Markdown files
        dirs: ['../components', '.'],
        include: [/\.vue($|\?)/, /\.md($|\?)/],
        resolvers: [
          IconsResolver({
            prefix: 'icon',
            customCollections: ['local'],
          }),
        ],
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          local: FileSystemIconLoader('assets/icons'),
        },
      }),
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('swiper'),
      },
    },
  },
  title: conference.title,
  description: conference.description,
  head: [
    ['link', { href: conference.favicon, rel: 'icon' }],
    ['meta', { property: 'og:description', content: conference.description }],
    ['meta', { property: 'og:url', content: conference.url }],
    ['meta', { property: 'og:type', content: conference.type }],
    ['meta', { property: 'og:site_name', content: conference.site_name }],
    ['meta', { property: 'og:image', content: conference.og_image }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-C9EMTMDSS1' }],
    [
      'script',
      {},
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-C9EMTMDSS1');
      `,
    ],
  ],
  srcDir: 'content',
  srcExclude: ['**/parts/**'],
  base: `/${conference.year}`,
  cleanUrls: true,
  rewrites: {
    'zh_tw/:rest*': ':rest*',
  },
  locales: {
    root: { label: '繁體中文', ...zh_tw },
    en: { label: 'English', ...en },
  },
  appearance: false,
  async buildEnd(_) {
    const enSubmissionLoader = (await import('../../loaders/allSubmissions.en.data')).default
    const zhTwSubmissionsLoader = (await import('../../loaders/allSubmissions.zh-tw.data')).default

    const enData = await enSubmissionLoader.load([])
    const zhTwData = await zhTwSubmissionsLoader.load([])

    const sessions = enData.map((enSession) => {
      const zhTwSession = zhTwData.find((s) => s.code === enSession.code)
      return {
        id: enSession.code,
        type: enSession.track.id.toString(),
        room: enSession.room.name,
        start: enSession.start,
        end: enSession.end,
        language: enSession.language,
        zh: {
          title: zhTwSession?.title ?? enSession.title,
          description: zhTwSession?.abstract ?? enSession.abstract ?? '',
        },
        en: {
          title: enSession.title,
          description: enSession.abstract ?? '',
        },
        speakers: enSession.speakers.map((s) => s.code),
        tags: [],
        co_write: enSession.co_write ?? null,
        qa: enSession.qa ?? null,
        slide: enSession.slide ?? null,
        record: enSession.record ?? null,
        uri: `https://coscup.org/2024/session/${enSession.code}`,
      }
    })

    const speakers = [
      ...new Map(
        [
          ...enData.flatMap((s) => s.speakers),
          ...zhTwData.flatMap((s) => s.speakers),
        ].map((s) => [s.code, s]),
      ).values(),
    ].map((s) => {
      const enSpeaker = enData.flatMap((s) => s.speakers).find((speaker) => speaker.code === s.code)
      const zhTwSpeaker = zhTwData.flatMap((s) => s.speakers).find((speaker) => speaker.code === s.code)
      return {
        id: s.code,
        avatar: s.avatar,
        zh: {
          name: zhTwSpeaker?.name ?? enSpeaker?.name ?? '',
          bio: zhTwSpeaker?.bio ?? enSpeaker?.bio ?? '',
        },
        en: {
          name: enSpeaker?.name ?? zhTwSpeaker?.name ?? '',
          bio: enSpeaker?.bio ?? zhTwSpeaker?.bio ?? '',
        },
      }
    })

    const session_types = [
      ...new Map(
        [
          ...enData.map((s) => s.track),
          ...zhTwData.map((s) => s.track),
        ].map((t) => [t.id, t]),
      ).values(),
    ].map((t) => {
      const enTrack = enData.map((s) => s.track).find((track) => track.id === t.id)
      const zhTwTrack = zhTwData.map((s) => s.track).find((track) => track.id === t.id)
      return {
        id: t.id.toString(),
        zh: {
          name: zhTwTrack?.name ?? enTrack?.name ?? '',
        },
        en: {
          name: enTrack?.name ?? zhTwTrack?.name ?? '',
        },
      }
    })

    const rooms = [
      ...new Map(
        [
          ...enData.map((s) => s.room),
          ...zhTwData.map((s) => s.room),
        ].map((r) => [r.id, r]),
      ).values(),
    ].map((r) => {
      const enRoom = enData.map((s) => s.room).find((room) => room.id === r.id)
      const zhTwRoom = zhTwData.map((s) => s.room).find((room) => room.id === r.id)
      return {
        id: r.id.toString(),
        zh: {
          name: zhTwRoom?.name ?? enRoom?.name ?? '',
        },
        en: {
          name: enRoom?.name ?? zhTwRoom?.name ?? '',
        },
      }
    })

    // TODO: Handle tags
    const tags: unknown[] = []

    const exportData = {
      sessions,
      speakers,
      session_types,
      rooms,
      tags,
    }

    fs.mkdirSync(resolve(__dirname, '../dist/json'), { recursive: true })

    fs.writeFileSync(
      resolve(__dirname, '../dist/json/sessions.json'),
      JSON.stringify(exportData, null, 2),
    )
  },
})
