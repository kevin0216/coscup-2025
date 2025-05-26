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
  rooms: string[]
  session_types: Record<string, string>
}

export default defineLoader({
  async load(): Promise<RoomData> {
    const res = await fetch('https://coscup.org/2024/json/session.json')
    const data: Data = await res.json()

    const session_types: Record<string, string> = data.session_types.reduce((acc: Record<string, string>, item: SessionType) => {
      acc[item.id] = item.zh.name
      return acc
    }, {})
    const unsorted_rooms = new Set<string>(data.sessions.map((session: Session) => session.room))
    const rooms = [...unsorted_rooms].sort((a, b) => a.localeCompare(b))
    const sessions: Record<string, Session[]> = rooms.reduce((acc: Record<string, Session[]>, item) => {
      acc[item] = data.sessions.filter((session: Session) => session.room === item).sort((a: Session, b: Session) => new Date(a.start).getTime() - new Date(b.start).getTime())
      return acc
    }, {})

    return {
      sessions,
      rooms,
      session_types,
    }
  },
})
