import { defineLoader, loadEnv } from 'vitepress'

// API 設定
const env = loadEnv('', process.cwd())
const SHEET_ID = env.VITE_SHEET_ID
const COMMUNITY_SHEET_NAME = env.VITE_COMMUNITY_SHEET_NAME
const API_KEY = env.VITE_API_KEY

interface SpreadsheetData {
  values: string[][]
}

type groupedCommunities = Record<string, Record<string, string>[]>

export interface Community {
  'id': string
  'name:zh-TW': string
  'name:en': string
  'intro:zh-TW': string
  'intro:en': string
  'link': string
  'image': string
}

// 取得 Google Sheets 資料
async function fetchCommunities(): Promise<Community[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${COMMUNITY_SHEET_NAME}?key=${API_KEY}`
    const response = await fetch(url)
    const data: SpreadsheetData = await response.json()

    if (!data.values) throw new Error('No data found in the spreadsheet')

    // First row is the header, subsequent rows are the data
    const [headers, ...values] = data.values

    // Map the data to the Sponsor interface
    const communities = values.map((row) =>
      headers.reduce((obj, key, i) => ({
        ...obj,
        [key]: row[i] || '',
      }), {} as Community),
    )

    return communities
  } catch (error) {
    console.error('Error fetching communities:', error)
    return []
  }
}

async function fetchGroupedCommunities(
  sheetName: string,
): Promise<groupedCommunities> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`
    const response = await fetch(url)
    const data: SpreadsheetData = await response.json()

    if (!data.values) throw new Error(`No data found in the ${sheetName} sheet`)

    const [headers, ...rows] = data.values

    const result: groupedCommunities = {}

    rows.forEach((row) => {
      const rowData = headers.reduce((obj, key, i) => {
        obj[key] = row[i] || ''
        return obj
      }, {} as Record<string, string>)

      const key = rowData.community_id

      if (!result[key]) result[key] = []
      result[key].push(rowData)
    })
    return result
  } catch (error) {
    console.error(`Error fetching or processing ${sheetName}:`, error)
    return {}
  }
}

interface CommunityData {
  communities: Community[]
  community_topics: groupedCommunities
  community_booths: groupedCommunities
}

export declare const data: CommunityData

export default defineLoader({
  async load(): Promise<CommunityData> {
    const communities = await fetchCommunities()
    const community_topics = await fetchGroupedCommunities('Topics')
    const community_booths = await fetchGroupedCommunities('Booths')

    return {
      communities,
      community_topics,
      community_booths,
    }
  },
})
