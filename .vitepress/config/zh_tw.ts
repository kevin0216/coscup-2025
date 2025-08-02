import { defineConfig } from 'vitepress'

export const zh_tw = defineConfig({
  lang: 'zh_tw',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '年會資訊', link: '/event' },
      { text: '參與指南', link: '/participate/attendee' },
      { text: '關於我們', link: '/about' },
      { text: '議程表', link: '/sessions' },
      { text: '贊助', link: '/sponsor' },
      { text: '社群夥伴', link: '/community' },
      { text: '工作人員', link: '/staff' },
      { text: '會場地圖', link: '/venue' },
      { text: '周邊活動', link: '/fringe' },
    ],
    sidebar: {
      '/participate': [
        {
          text: '參與指南',
          link: '/participate/attendee',
          items: [
            { text: '身為「會眾」', link: '/participate/attendee' },
            { text: '身為「社群」', link: '/participate/community' },
            { text: '身為「贊助夥伴」', link: '/participate/sponsor' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/COSCUP' },
    ],
    docFooter: {
      prev: '上一頁',
      next: '下一頁',
    },

    outline: {
      label: '導覽',
    },

    langMenuLabel: '其他語言',
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '目錄',
    darkModeSwitchLabel: '主題',
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',
  },
})
