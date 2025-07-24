import { defineLoader } from 'vitepress'
import { extractLocalizedStructure, pretalxClient } from './pretalx'

export declare const data: { id: number, name: string }[]

export default defineLoader({
  async load(): Promise<typeof data> {
    const rooms = await pretalxClient.getRooms()

    return extractLocalizedStructure(rooms, 'en')
  },
})
