import { defineLoader, loadEnv } from 'vitepress'

// API 設定
const env = loadEnv('', process.cwd())
const SHEET_ID = env.VITE_SHEET_ID
const COMMUNITY_SHEET_NAME = env.VITE_FRINGE_SHEET_NAME
const API_KEY = env.VITE_API_KEY

interface SpreadsheetData {
  values: string[][]
}

export interface Fringe {
  'id': string
  'title:zh-TW': string
  'title:en': string
  'description:zh-TW': string
  'description:en': string
  'link': string
  'contact': string
  'contact_email': string
  'logo': string
}

// 處理圖片
async function getImageBase64(imageUrl: string): Promise<string> {
  if (!imageUrl) {
    return ''
  }

  let response

  if (!imageUrl.includes('drive.google.com')) {
    response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Faile to fetch image from url: ${response.statusText}`)
    }
  } else {
    const getImageID = imageUrl.match(/\/d\/([^/]+)\//)
    const imageID = getImageID ? getImageID[1] : null
    const directUrl = `https://drive.google.com/uc?export=view&id=${imageID}`
    response = await fetch(directUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch image from Google Drive: ${response.statusText}`)
    }
  }
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${buffer.toString('base64')}`
}

// 取得 Google Sheets 資料
async function fetchFringes(): Promise<Fringe[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${COMMUNITY_SHEET_NAME}?key=${API_KEY}`
    const response = await fetch(url)
    const data: SpreadsheetData = await response.json()

    if (!data.values) throw new Error('No data found in the spreadsheet')

    // First row is the header, subsequent rows are the data
    const [headers, ...values] = data.values

    // Map the data to the Sponsor interface
    const fringes = values.map((row) =>
      headers.reduce((obj, key, i) => ({
        ...obj,
        [key]: row[i] || '',
      }), {} as Fringe),
    )

    return Promise.all(fringes.map(async (fringe) => ({
      ...fringe,
      logo: await getImageBase64(fringe.logo),
    })))
  } catch (error) {
    console.error('Error fetching fringes:', error)
    return []
  }
}

export declare const data: Fringe[]

export default defineLoader({
  async load(): Promise<Fringe[]> {
    const fringes: Fringe[] = await fetchFringes()

    return fringes
  },
})
