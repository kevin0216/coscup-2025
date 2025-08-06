import { defineLoader } from 'vitepress'

interface Session {
  id: string
  type: string
  room: string
  start: string
  end: string
  language: string
  zh: {
    title: string
    description: string
  }
  en: {
    title: string
    description: string
  }
  speakers: string[]
  tags: string[]
  co_write: string
  qa: null
  slide: null
  record: null
  uri: string
}

interface SessionType {
  id: string
  zh: {
    name: string
  }
  en: {
    name: string
  }
}

interface Speaker {
  id: string
  avatar: string
  zh: {
    name: string
    bio: string
  }
  en: {
    name: string
    bio: string
  }
}

interface Room {
  id: string
  zh: {
    name: string
  }
  en: {
    name: string
  }
}

interface Tag {
  id: string
  zh: {
    name: string
  }
  en: {
    name: string
  }
}

interface Data {
  sessions: Session[]
  speakers: Speaker[]
  session_types: SessionType[]
  rooms: Room[]
  tags: Tag[]
}

interface RoomData {
  sessions: Record<string, Session[]>
  rooms: Record<string, { zh: string, en: string }>
  session_types: Record<string, { zh: string, en: string }>
}

export default defineLoader({
  async load(): Promise<RoomData> {
    const res = await fetch('https://coscup.org/2025/json/session.json')
    const data: Data = await res.json()

    const session_types: Record<string, { zh: string, en: string }> = data.session_types.reduce((acc: Record<string, { zh: string, en: string }>, item: SessionType) => {
      acc[item.id] = {
        zh: item.zh.name,
        en: item.en.name,
      }
      return acc
    }, {})
    const rooms: Record<string, { zh: string, en: string }> = data.rooms.reduce((acc: Record<string, { zh: string, en: string }>, item: Room) => {
      acc[item.id] = {
        zh: item.zh.name,
        en: item.en.name,
      }
      return acc
    }, {})
    const sessions: Record<string, Session[]> = data.rooms.reduce((acc: Record<string, Session[]>, item) => {
      acc[item.id] = data.sessions.filter((session: Session) => session.room === item.id).sort((a: Session, b: Session) => new Date(a.start).getTime() - new Date(b.start).getTime())
      return acc
    }, {})

    return {
      sessions,
      rooms,
      session_types,
    }
  },
})
