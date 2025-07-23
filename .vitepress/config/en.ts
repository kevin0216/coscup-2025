import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/en' },
      { text: 'Event', link: '/en/event' },
      { text: 'About', link: '/en/about' },
      { text: 'Sessions', link: '/en/sessions' },
      { text: 'Sponsor', link: '/en/sponsor' },
      { text: 'Community', link: '/en/community' },
      { text: 'Staff', link: '/en/staff' },
      { text: 'venue', link: '/en/venue' },
    ],
    sidebar: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/COSCUP' },
    ],
  },
})
