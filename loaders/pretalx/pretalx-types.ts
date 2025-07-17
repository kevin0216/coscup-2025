import type { AnswerReadable, RoomReadable, SpeakerReadable, SubmissionReadable, TrackReadable } from './oapi'

export const coscupSpeakerQuestionIdMap = {
  ZhName: 45,
  EnName: 46,
  ZhBio: 47,
  EnBio: 48,
} as const

export type PretalxAnswer = AnswerReadable
export type PretalxTalk = SubmissionReadable
export type PretalxSpeaker = SpeakerReadable
export type PretalxRoom = RoomReadable
export type PretalxTrack = TrackReadable

export const coscupSubmissionsQuestionIdMap = {
  Language: 269, // 中文, 英文, 其他
  LanguageOther: 300, // if 其他, then use this field
  EnTitle: 257, // 翻譯成英文的標題
  EnDesc: 259, // 翻譯成英文的摘要
  Difficulty: 270,
  CoWrite: null,
  Qa: null,
  Slide: null,
  Record: null,
} as const

export const languageGeneralizeMap: Record<string, 'zh-tw' | 'en' | 'ja-JP' | 'taiwanese' | 'others'> = {
  中文: 'zh-tw',
  漢語: 'zh-tw',
  Chinese: 'zh-tw',
  Mandarin: 'zh-tw',
  英文: 'en',
  English: 'en',
  Japanese: 'ja-JP',
  日本語: 'ja-JP',
  台語: 'taiwanese',
  Taiwanese: 'taiwanese',
  其他: 'others',
  Others: 'others',
  中国語: 'zh-tw',
  英語: 'en',
  その他: 'others',
}

type LanguageLocalizeKey = typeof languageGeneralizeMap extends Record<string, infer K> ? K : never

export const difficultyGeneralizeMap: Record<string, 'Elementary' | 'Middle' | 'Advance' | 'Professional'> = {
  初學者: 'Elementary',
  入門: 'Elementary',
  中階: 'Middle',
  進階: 'Advance',
  專業: 'Professional',
  Beginner: 'Elementary',
  Elementary: 'Elementary',
  Middle: 'Middle',
  Intermediate: 'Middle',
  Advance: 'Advance',
  Advanced: 'Advance',
  Professional: 'Professional',
  beginner: 'Elementary',
  elementary: 'Elementary',
  intermediate: 'Middle',
  middle: 'Middle',
  advance: 'Advance',
  advanced: 'Advance',
  professional: 'Professional',
  初級: 'Elementary',
  中級: 'Middle',
  上級: 'Advance',
}

type DifficultyLocalizeKey = typeof difficultyGeneralizeMap extends Record<string, infer K> ? K : never

export const tagTranslations: Record<'en' | 'zh-tw', Record<LanguageLocalizeKey | DifficultyLocalizeKey | 'others', string>> = {
  'en': {
    'Elementary': 'Elementary',
    'Middle': 'Intermediate',
    'Advance': 'Advance',
    'Professional': 'Professional',
    'zh-tw': 'Mandarin',
    'en': 'English',
    'ja-JP': '日本語',
    'taiwanese': '台語',
    'others': '其他',
  },
  'zh-tw': {
    'Elementary': '入門',
    'Middle': '中階',
    'Advance': '進階',
    'Professional': '專業',
    'zh-tw': '漢語',
    'en': '英語',
    'ja-JP': '日本語',
    'taiwanese': '台語',
    'others': '其他',
  },
}
