import bofHackingRoom from '#assets/images/activity2.jpg'
import attendSurvey from '#assets/images/activity3.jpg'
import beforeParty from '#assets/images/activity4.png'

export interface CardInfo {
  'title:zh_tw': string
  'title:en-US': string
  'description:zh_tw': string
  'description:en-US': string
  'link': string | undefined
  'link_display:zh_tw': string
  'link_display:en-US': string
  'img': string | undefined
  'img_alt:zh_tw': string | undefined
  'img_alt:en-US': string | undefined
}

export const eventData: CardInfo[] = [{
  'title:zh_tw': '會前派對',
  'title:en-US': 'Pre-Conference Party',
  'description:zh_tw': 'COSCUP x RubyConf TW 2025 前夜派對 Support By ExpressVPN 2025/8/8，跟大會講者與社群同好大聊特聊、為開源乾一杯!',
  'description:en-US': 'Join the COSCUP x RubyConf TW 2025 Pre-Conference Party Sponsor By ExpressVPN on 2025/8/8 to chat with speakers and community members, and raise a glass to open source!',
  'link': 'https://ocf.neticrm.tw/civicrm/event/info?reset=1&id=47',
  'link_display:zh_tw': '來喝一杯',
  'link_display:en-US': 'Have a Drink',
  'img': beforeParty,
  'img_alt:zh_tw': '會前派對',
  'img_alt:en-US': 'Pre-Conference Party',
}, {
  'title:zh_tw': 'BoF/Hacking Corner',
  'title:en-US': 'BoF/Hacking Corner',
  'description:zh_tw': '每年 COSCUP 聚集了臺灣及世界各地的開放文化及開源愛好者，BoF / hacking Corner 在會期提供有別於常規議程，讓開源同好面對面深度雙向交流的機會!',
  'description:en-US': 'Every year, COSCUP brings together open culture and open source enthusiasts from Taiwan and around the world. The BoF/hacking room provides an alternative to the regular agenda, offering a chance for in-depth, face-to-face interaction among open source peers!',
  'link': 'https://s.coscup.org/bof25',
  'link_display:zh_tw': '揪團 +1',
  'link_display:en-US': 'Join Group',
  'img': bofHackingRoom,
  'img_alt:zh_tw': 'BoF/Hacking Room',
  'img_alt:en-US': 'BoF/Hacking Room',
}, {
  'title:zh_tw': '參與者大調查',
  'title:en-US': 'Attendee Survey',
  'description:zh_tw': 'COSCUP 想更了解今年的參與者樣貌!不論是長期參與開源社群，或是首次走進 COSCUP，都歡迎填寫問卷，一起關注開源社群的組成與未來方向。',
  'description:en-US': 'COSCUP wants to better understand this year\'s attendees! Whether you\'re a long-time open source community member or a first-time visitor, we welcome you to fill out the survey and help us understand the composition and future direction of our community.',
  'link': 'https://coscup.org/2025-survey',
  'link_display:zh_tw': '前往填寫',
  'link_display:en-US': 'Go to Survey',
  'img': attendSurvey,
  'img_alt:zh_tw': '參與者大調查',
  'img_alt:en-US': 'Attendee Survey',
}]
