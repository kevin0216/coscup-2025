interface GoogleSheetResponse {
  majorDimension: string
  range: string
  values: string[][]
}

/**
 * Fetch a sheet from a Google Sheet and return the data as an array of objects.
 * @param options Options for fetching a Google Sheet.
 * @param options.sheetId The ID of the Google Sheet.
 * @param options.sheetName The name of the sheet within the Google Sheet.
 * @param options.apiKey The API key for accessing the Google Sheets API.
 * @template SheetRow The type of the objects in the returned array.
 * @returns A promise that resolves to an array of objects representing the data in the sheet.
 */
export async function getGoogleSheet<SheetRow extends Record<string, string>>({
  sheetId,
  sheetName,
  apiKey,
}: {
  sheetId: string
  sheetName: string
  apiKey: string
}): Promise<SheetRow[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet: ${response.status} ${response.statusText}`)
  }

  const data: GoogleSheetResponse = await response.json()

  if (!data.values) throw new Error(`No data found in the ${sheetName} sheet`)

  // First row is the header, subsequent rows are the data
  const [headers, ...values] = data.values

  const result = values.map((row) =>
    headers.reduce((obj, key, i) => {
      obj[key] = row[i] || ''
      return obj
    }, {} as Record<string, string>),
  ) as SheetRow[]

  return result
}

/**
 * The CDN URL for Google Drive images.
 *
 * If you want to self-host this, you might need to set up a
 * [image-compress-server](https://github.com/COSCUP/image-compress-server)
 * instance and point the `DRIVE_IMAGE_CDN` environment variable to it.
 *
 * Set this value to `https://drive.google.com/uc?export=view&id=` to
 * use the Google Drive URL directly if you don't prefer a CDN.
 */
const driveImageCdn = process.env.DRIVE_IMAGE_CDN ?? 'https://coscup-2025-drive-cache.b-cdn.net/'

/**
 * Get the optimized Google Drive image URL.
 *
 * @param imageUrl The URL of the Google Drive image.
 * @returns The absolute path to the optimized image.
 */
export async function getDriveImage(imageUrl: string): Promise<string> {
  if (!imageUrl) {
    return ''
  }

  const getImageID = imageUrl.match(/\/d\/([^/]+)\//)
  const imageID = getImageID ? getImageID[1] : null

  const optimizedImageUrl = `${driveImageCdn}${imageID}`

  // preload this image so it will be cached, since the
  // optimization usually takes 2+ seconds to complete
  try {
    const response = await fetch(optimizedImageUrl)
    if (!response.ok) {
      console.error(`Failed to preload image: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Failed to preload image:', error)
  }

  return optimizedImageUrl
}
