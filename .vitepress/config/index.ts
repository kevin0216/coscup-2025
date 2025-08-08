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
import {
  difficultyGeneralizeMap,
  languageGeneralizeMap,
  tagTranslations,
} from '../../loaders/pretalx/pretalx-types'
import { en } from './en'
import { zh_tw } from './zh_tw'

// https://vitepress.dev/reference/site-config
export default async () => {
  const enSubmissionLoader = (await import('../../loaders/allSubmissions.en.data')).default
  const zhTwSubmissionsLoader = (await import('../../loaders/allSubmissions.zh-tw.data')).default

  const enData = await enSubmissionLoader.load([])
  const zhTwData = await zhTwSubmissionsLoader.load([])

  return defineConfig({
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
      build: {
        cssMinify: 'lightningcss',
      },
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
      ['meta', { property: 'og:image', content: conference.og_image }],
      ['meta', { property: 'og:url', content: conference.url }],
      ['meta', { property: 'og:type', content: conference.type }],
      ['meta', { property: 'og:site_name', content: conference.site_name }],
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
    transformPageData(pageData) {
      if (!pageData.params?.session) {
        return
      }

      const sessions = pageData.filePath.includes('en') ? enData : zhTwData
      const session = sessions.find((s) => s.code === pageData.params?.session)

      if (!session) {
        return
      }

      return {
        title: session.title,
        description: session.abstract?.replaceAll('\n', ' '),
      }
    },
    transformHead({ pageData }) {
      if (!pageData.params?.session) {
        return [
          ['meta', { property: 'og:title', content: conference.title }],
          ['meta', { property: 'og:description', content: conference.description }],
        ]
      } else {
        return [
          ['meta', { property: 'og:title', content: pageData.title }],
          ['meta', { property: 'og:description', content: pageData.description }],
        ]
      }
    },
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
      function formatToTaipeiTime(dateString: string | Date | null | undefined): string | null | undefined {
        if (!dateString) {
          return dateString
        }
        const date = new Date(dateString)
        // 'en-CA' locale gives date in 'YYYY-MM-DD' format
        const ymd = date.toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' })
        // 'en-CA' locale gives time in 'HH:mm:ss' format
        const hms = date.toLocaleTimeString('en-CA', { hour12: false, timeZone: 'Asia/Taipei' })
        return `${ymd}T${hms}+08:00`
      }
      function generateLanguageTagId(generalizedLang: string): string {
        return `language_${generalizedLang.toLowerCase().replace(/-/g, '')}`
      }
      function generateDifficultyTagId(generalizedDiff: string): string {
        return `difficulty_${generalizedDiff.toLowerCase().replace(/ /g, '_')}`
      }

      const sessions = enData.map((enSession) => {
        const zhTwSession = zhTwData.find((s) => s.code === enSession.code)
        const sessionTags: string[] = []
        if (enSession.language && languageGeneralizeMap[enSession.language]) {
          const generalizedLang = languageGeneralizeMap[enSession.language]
          sessionTags.push(generateLanguageTagId(generalizedLang))
        }
        if (enSession.difficulty && difficultyGeneralizeMap[enSession.difficulty]) {
          const generalizedDiff = difficultyGeneralizeMap[enSession.difficulty]
          sessionTags.push(generateDifficultyTagId(generalizedDiff))
        }
        return {
          id: enSession.code,
          type: enSession.track.id.toString(),
          room: enSession.room.id.toString(),
          start: formatToTaipeiTime(enSession.start),
          end: formatToTaipeiTime(enSession.end),
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
          tags: sessionTags,
          co_write: enSession.co_write ?? null,
          qa: enSession.qa ?? null,
          slide: enSession.slide ?? null,
          record: enSession.record ?? null,
          uri: `https://coscup.org/2025/sessions/${enSession.code}`,
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
      }).sort((a, b) => Number(a.id) - Number(b.id))

      const allLanguages = new Set(
        enData
          .map((s) => s.language)
          .map((l) => languageGeneralizeMap[l])
          .filter((l) => !!l),
      )
      const allDifficulties = new Set(
        enData
          .map((s) => s.difficulty)
          .map((d) => difficultyGeneralizeMap[d])
          .filter((d) => !!d),
      )

      const languageTags = Array.from(allLanguages).map((langKey) => {
        return {
          id: generateLanguageTagId(langKey),
          zh: {
            name: tagTranslations['zh-tw'][langKey] ?? langKey,
          },
          en: {
            name: tagTranslations.en[langKey] ?? langKey,
          },
        }
      })

      const difficultyTags = Array.from(allDifficulties).map((diffKey) => {
        return {
          id: generateDifficultyTagId(diffKey),
          zh: {
            name: tagTranslations['zh-tw'][diffKey] ?? diffKey,
          },
          en: {
            name: tagTranslations.en[diffKey] ?? diffKey,
          },
        }
      })

      const tags = [...languageTags, ...difficultyTags]

      const exportData = {
        sessions,
        speakers,
        session_types,
        rooms,
        tags,
      }

      fs.mkdirSync(resolve(__dirname, '../dist/json'), { recursive: true })

      fs.writeFileSync(
        resolve(__dirname, '../dist/json/session.json'),
        JSON.stringify(exportData, null, 2),
      )
    },
  })
}
